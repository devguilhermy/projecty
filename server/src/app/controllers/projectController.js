const express = require("express");
const authMiddleware = require("../middlewares/auth");

const Project = require("../models/Project");
const Task = require("../models/Task");
const auth = require("../middlewares/auth");

const router = express.Router();

router.post("/register", authMiddleware, async (req, res) => {
    try {
        const { title, description, tasks } = req.body;

        if (!title || !description) {
            return res.status(400).send({ message: "The request data is incomplete!" });
        }

        const user = req.userId;
        const project = await Project.create({ title, description, user });

        if (tasks) {
            try {
                await Promise.all(tasks.map(async task => {
                    const projectTask = new Task({ ...task, project: project.id });
                    await projectTask.save();

                    project.tasks.push(projectTask);
                }));

                await project.save();

            } catch (error) {
                return res.status(400).send({ message: "The project was registered, but an error ocurred when creating the tasks", details: error })
            }
        }

        return res.send({ message: "The project was registered!", project });

    } catch (error) {
        return res.status(400).send({ message: "Project registration failed", details: error })
    }
});

router.get("/", authMiddleware, async (req, res) => {
    try {
        const projects = await Project.find().populate("tasks user");

        return res.send({ message: "Project list fetched", projects });
    } catch (error) {
        return res.status(400).send({ message: "An error ocurred!", details: error })
    }
});

router.get("/:projectId", authMiddleware, async (req, res) => {
    try {
        if (!req.params.projectId) {
            return res.status(400).send({ message: "No project identifier provided!" })
        }

        const project = await Project.findById(req.params.projectId).populate("tasks user");

        if (!project) {
            return res.status(400).send({ message: "There is no project with the identifier provided!" })
        }

        return res.send({ message: "Project information fetched", project });
    } catch (error) {
        return res.status(400).send({ message: "An error ocurred!", details: error })
    }
});

router.put("/:projectId", authMiddleware, async (req, res) => {
    try {
        const { title, description, tasks } = req.body;

        if (!title || !description) {
            return res.status(400).send({ message: "The request data is incomplete!" });
        }

        const project = await Project.findByIdAndUpdate(req.params.projectId, { title, description }, { new: true });

        try {
            project.tasks = [];
            await Task.remove({ project: project.id })

            if (tasks) {
                await Promise.all(tasks.map(async task => {
                    const projectTask = new Task({ ...task, project: project.id });
                    await projectTask.save();
    
                    project.tasks.push(projectTask);
                }));
            }

            await project.save();

        } catch (error) {
            return res.status(400).send({ message: "The project information was updated, but an error ocurred when updating the tasks", details: error })
        }

        return res.send({ message: "The project information was updated!", project });

    } catch (error) {
        return res.status(400).send({ message: "Project registration failed", details: error })
    }
});

router.delete("/:projectId", authMiddleware, async (req, res) => {
    try {
        if (!req.params.projectId) {
            return res.status(400).send({ message: "No project identifier provided!" })
        }

        const project = await Project.findByIdAndRemove(req.params.projectId);

        if (!project) {
            return res.status(400).send({ message: "There is no project with the identifier provided!" })
        }

        return res.send({ message: "Project deleted successfully" });
    } catch (error) {
        return res.status(400).send({ message: "An error ocurred!", details: error })
    }
})

module.exports = app => app.use("/projects", router);
