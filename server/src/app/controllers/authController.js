const express = require("express");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const mailer = require("../modules/mailer");

const authConfig = require("../../config/auth");
const router = express.Router();
const User = require("../models/User");

function generateToken(params = {}) {
    const token = jwt.sign(params, authConfig.secret, { expiresIn: 3600 });

    return token;
}

router.post("/register", async (req, res) => {
    try {
        const { email } = req.body;
        if (await User.findOne({ email })) {
           return res.status(400).send({ message: "Email address is taken!" })
        }
        const user = await User.create(req.body);
        user.password = undefined;

        return res.send({
            message: "User registered successfully",
            user,
            token: generateToken({ id: user.id })
        });
    } catch (error) {
        return res.status(400).send({ message: "Registration failed", error })
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return res.status(400).send({ message: "User not found" });
        }
        if (!await bcrypt.compare(password, user.password)) {
            return res.status(400).send({ message: "Wrong password" });
        }

        user.password = undefined;

        return res.send({
            user,
            token: generateToken({ id: user.id })
        });
    } catch (error) {
        return res.status(400).send({ message: "Registration failed", error })
    }
});

router.post("/forget_password", async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).send({ message: "No account found with the email!" })
        }

        const token = crypto.randomBytes(20).toString("hex");

        const time = new Date();
        time.setHours(time.getHours() +1);

        await User.findByIdAndUpdate(user.id, {
            "$set": {
                passwordResetToken: token,
                passwordResetExpiration: time
            }
        })

        mailer.sendMail({
            to: email,
            from: "gui@gmail.com",
            template: "auth/resetPassword",
            context: { token }
        }, (error) => {
            if (error) {
                return res.status(400).send({message: "Could not send reset password email", error});
            }

            return res.send({message: "Email sent!"});
        });
    } catch (error) {
        return res.status(400).send({ message: "Password reset failed", error });
    }
});

router.post("/reset_password", async (req, res) => {
    try {
        const {email, token, password} = req.body;

        if (!email || !token || !password) {
            return res.status(400).send({message: "The request data is incomplete!"});
        }

        const user = await User.findOne({email}).select("+passwordResetToken passwordTokenExpiration");
        
        if (!user) {
            return res.status(400).send({message: "There is no user with the email provided!"});
        }
    
        if (token !== user.passwordResetToken) {
            return res.status(400).send({message: "The token provided is not valid!"});
        }
    
        const now = new Date();
    
        if (user.passwordResetExpiration < now) {
            return res.status(400).send({message: "The token expired!"});
        }
  
        user.password = password;

        await user.save();

        return res.send({message: "Password reset successfully"});
    } catch (error){
        return res.status(400).send({message: "An error ocurred", details: error})
    }
})


module.exports = app => app.use("/auth", router);