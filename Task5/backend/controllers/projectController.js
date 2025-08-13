// request/response

const projectService = require("../services/projectService");

const getAllProjects = (req, res) => {
  const all = projectService.getAllProjects();
  res.json(all);
};

const getProject = (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(404).json({ error: "Invalid Id" });

  const project = projectService.getProjectById(id);
  if (!project) return res.status(404).json({ error: "Project not found " });

  res.json(project);
};

const createProject = (req, res) => {
  const { name, description, status } = req.body;

  if (!name || !description || !status) {
    return res.status(400).json({ error: "Missing Data" });
  }

  const newProject = projectService.createProject(name, description, status);
  res.status(201).json(newProject);
};

const updateProject = (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: "invalid Id" });

  const updates = req.body;

  const updated = projectService.updateProject(id, updates);
  if (!updated) return res.status(404).json({ error: "Project not found" });

  res.json(updated);
};

const deleteProject = (req, res) => {
  const id = parseInt(req.params.id);

  const deleted = projectService.deleteProject(id);
  if (!deleted) return res.status(404).json({ error: "Project not found" });

  res.json({ message: "Project deleted" });
};

module.exports = {
  getAllProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
};
