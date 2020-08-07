const nodemailer = require("nodemailer");
const path = require("path");
const hbs = require("nodemailer-express-handlebars");

const { host, port, user, pass } = require("../../config/mailer");

const transport = nodemailer.createTransport({
	host,
	port,
	auth: { user, pass }
});

transport.use("compile", hbs({
	viewEngine: {
		defaultLayout: undefined,
		partialsDir: path.resolve('./src/assets/mail/')
	},
	viewPath: path.resolve("./src/assets/mail/"),
	extName: ".html"
}));

module.exports = transport;