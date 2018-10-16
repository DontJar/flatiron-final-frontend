const URL = "http://localhost:3000/api/v1/";

function fetchProjects() {
  return dispatch => {
    // dispatch(loadingProjects());
    fetch(URL + "projects")
      .then(r => r.json())
      .then(json => dispatch(fetchedProjects(json)));
  };
}

function fetchedProjects(projects) {
  return { type: "UPDATE_STORE_WITH_ALL_PROJECTS", projects };
}

function createNewProject(newProject) {
  return dispatch => {
    fetch(`${URL}projects`, {
      method: "POST",
      body: JSON.stringify({
        title: newProject.name,
        description: newProject.description
      }),
      headers: {
        "Content-type": "application/json",
        Accept: "application/json"
      }
    })
      .then(r => r.json())
      .then(json => dispatch(fetchProjects()));
  };
}

function updateProject(projectInfo, id) {
  return dispatch => {
    fetch(`${URL}projects/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        description: projectInfo.description
      }),
      headers: {
        "Content-type": "application/json",
        Accept: "application/json"
      }
    })
      .then(r => r.json())
      .then(json => dispatch(fetchProjects()));
  };
}

function deleteProject(projectId) {
  return dispatch => {
    fetch(`${URL}projects/` + projectId, {
      method: "DELETE",
      body: JSON.stringify({ id: projectId })
    })
      .then(r => r.json())
      .then(json => dispatch(fetchProjects()));
  };
}

function deleteImage(imageId) {
  return dispatch => {
    fetch(`${URL}images/` + imageId, {
      method: "DELETE",
      body: JSON.stringify({ id: imageId })
    })
      .then(r => r.json())
      .then(json => dispatch(fetchProjects()));
  };
}

function createNewStep(newStep) {
  return dispatch => {
    fetch(`${URL}steps`, {
      method: "POST",
      body: JSON.stringify({
        project_id: newStep.project_id,
        description: newStep.description
      }),
      headers: {
        "Content-type": "application/json",
        Accept: "application/json"
      }
    })
      .then(r => r.json())
      .then(json => dispatch(addNewImage(json.id, newStep.imageUrl)));
  };
}

function deleteStep(stepId) {
  return dispatch => {
    fetch(`${URL}steps/` + stepId, {
      method: "DELETE",
      body: JSON.stringify({ id: stepId })
    })
      .then(r => r.json())
      .then(json => dispatch(fetchProjects()));
  };
}

function addNewImage(stepId, imageUrl) {
  // debugger;
  return dispatch => {
    fetch(`${URL}images`, {
      method: "POST",
      body: JSON.stringify({
        step_id: stepId,
        url: imageUrl
      }),
      headers: {
        "Content-type": "application/json",
        Accept: "application/json"
      }
    })
      .then(r => r.json())
      .then(dispatch(fetchProjects()));
  };
}

// t.string "url"
// t.integer "step_id"

export {
  fetchProjects,
  createNewProject,
  deleteProject,
  updateProject,
  createNewStep,
  deleteStep,
  addNewImage,
  deleteImage
};
