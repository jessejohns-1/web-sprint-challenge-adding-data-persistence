const express = require("express");
const router = express.Router();
const Projects = require("./model");

router.get("/", async (req, res, next) => {
  try {
    const projects = await Projects.findProjects();
    res.json(projects);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const newProject = await Projects.postProjects(req.body);
    const project = {
      project_id: newProject.project_id,
      project_name: newProject.project_name,
      project_description: newProject.project_description,
      project_completed: newProject.project_completed,
    };
    res.status(201).json(project);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
