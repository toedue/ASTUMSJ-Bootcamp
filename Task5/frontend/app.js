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
    div.className = "project-item";
    div.innerHTML = `
    <hr>
    <div class="newProject">
      <div style="margin: 10px;"><strong>${project.name}</strong></div> 
      <div style="margin: 10px;"> ${project.description} </div> 
      <div style="margin: 10px;">Status: ${project.status} </div>
    
      <div class="buttonContainer">
      <button class="mark" onclick="toggleStatus(${project.id}, '${
      project.status
    }')">
        ${project.status === "ongoing" ? "Mark Completed" : "Mark Ongoing"}
      </button>
      <button class="edit" onclick="enableEditMode(${project.id})">Edit</button>
      <button class="delete" onclick="deleteProject(${
        project.id
      })">Delete</button>
      </div>
    </div>


      <!-- This will be shown when editing -->
      <div class="edit-form" id="edit-form-${
        project.id
      }" style="display: none;">
        <input type="text" id="edit-name-${project.id}" value="${project.name}">
        <textarea id="edit-description-${project.id}">${
      project.description
    }</textarea>
        <button onclick="saveProject(${project.id})">Save</button>
        <button onclick="cancelEdit(${project.id})">Cancel</button>
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

/////////////////////////////////////////////////////

// Make functions available globally
window.enableEditMode = enableEditMode;
window.cancelEdit = cancelEdit;
window.saveProject = saveProject;

function enableEditMode(projectId) {
  // Hide the normal project view
  document.querySelector(
    `#edit-form-${projectId}`
  ).previousElementSibling.style.display = "none";
  // Show the edit form
  document.getElementById(`edit-form-${projectId}`).style.display = "block";
}

function cancelEdit(projectId) {
  // Show the normal project view
  document.querySelector(
    `#edit-form-${projectId}`
  ).previousElementSibling.style.display = "block";
  // Hide the edit form
  document.getElementById(`edit-form-${projectId}`).style.display = "none";
}

async function saveProject(projectId) {
  const newName = document.getElementById(`edit-name-${projectId}`).value;
  const newDescription = document.getElementById(
    `edit-description-${projectId}`
  ).value;

  if (!newName || !newDescription) {
    return alert("Please fill all fields");
  }

  try {
    await fetch(`${API_URL}/${projectId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: newName,
        description: newDescription,
        // We're not changing status here, but you could add that too
      }),
    });

    // Reload projects to show changes
    loadProjects();
  } catch (error) {
    console.error("Error updating project:", error);
    alert("Failed to update project");
  }
}
