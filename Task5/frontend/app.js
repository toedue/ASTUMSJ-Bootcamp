const API_URL = "http://localhost:3000/api/projects";

document.addEventListener("DOMContentLoaded", () => {
  loadProjects();

  document
    .getElementById("project-form")
    .addEventListener("submit", async (e) => {
      e.preventDefault(); 

      const name = document.getElementById("name").value;
      const description = document.getElementById("description").value;
      const status = document.getElementById("status").value;

      if (!name || !description) return alert("Please fill all fields");

      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description, status }),
      });

      e.target.reset();
      loadProjects();
    });
});

async function loadProjects() {
  const res = await fetch(API_URL); // get request by default
  const projects = await res.json();
  const list = document.getElementById("projects-list");
  list.innerHTML = "";
  projects.forEach((project) => {
    const div = document.createElement("div");
    div.innerHTML = `
    <hr>
      <div style="margin-bottom: 10px;"><strong>${project.name}</strong></div> 
      <div style="margin-bottom: 10px;"> ${project.description} </div> 
      <div style="margin-bottom: 10px; background-color: gray;">${
        project.status
      } </div>
    
      <button class="delete" onclick="deleteProject(${
        project.id
      })">Delete</button>
      <button class="mark" onclick="toggleStatus(${project.id}, '${
      project.status
    }')">
        ${project.status === "ongoing" ? "Mark Completed" : "Mark Ongoing"}
      </button>
      </div>
      <hr>`;
    list.appendChild(div);
  });
}

async function deleteProject(id) {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  loadProjects();
}

async function toggleStatus(id, currentStatus) {
  const newStatus = currentStatus === "ongoing" ? "completed" : "ongoing";
  await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status: newStatus }),
  });
  loadProjects();
}
