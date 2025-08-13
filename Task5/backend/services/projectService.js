const projects = require("../data/projects");


let nextId = projects.length ? Math.max(...projects.map((p) => p.id)) + 1 : 1;



const getAllProjects = () => projects;



const getProjectById = (id) => projects.find((p) => p.id === id);



const createProject = (name, description, status) => {
  const newProject = {
    id: nextId++,
    name,
    description,
    status,
  };
  projects.push(newProject);
  return newProject;
}



const updateProject = (id, updates) => {
  const project = getProjectById(id);
  if (!project) return null;

  if (updates.name !== undefined) project.name = updates.name;
  if (updates.description !== undefined)
    project.description = updates.description;
  if (updates.status !== undefined) {
    project.status = updates.status === "completed" ? "completed" : "ongoing";
  }

  return project;  
}



const deleteProject = (id) => {
  const idx = projects.findIndex((p) => p.id === id);
  if (idx === -1) return false;
  projects.splice(idx, 1);
  return true;

}

module.exports = {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
};
