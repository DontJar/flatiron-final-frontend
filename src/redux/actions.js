// const URL = "http://localhost:3000/api/v1/";

// switcher-oo for mobile use

import { Router, Route } from "react-router-dom";

const URL = "http://192.168.10.114:3000/api/v1/";

function fetchProjects() {
  return dispatch => {
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
        title: newProject.title,
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

function createNewStep(newStep, imageFile) {
  // debugger;
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
      .then(
        json =>
          imageFile
            ? dispatch(uploadNewImage(json.id, imageFile))
            : dispatch(addNewImage(json.id, newStep.imageUrl))
      );
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

function uploadNewImage(stepId, fileToUpload) {
  let formData = new FormData();
  formData.append("step_id", stepId);
  formData.append("step_image", fileToUpload);

  return dispatch => {
    fetch(`${URL}images`, {
      method: "POST",
      body: formData
    })
      .then(r => r.json())
      .then(dispatch(fetchProjects()));
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

function unsetImageFromCover(oldCoverId) {
  return dispatch => {
    fetch(`${URL}images/${oldCoverId}`, {
      method: "PATCH",
      body: JSON.stringify({
        is_cover: false
      }),
      headers: {
        "Content-type": "application/json",
        Accept: "application/json"
      }
    })
      .then(r => r.json())
      .then(_ => dispatch(fetchProjects()));
  };
}

function setImageToCover(imageId, oldCoverId) {
  // debugger;
  return dispatch => {
    fetch(`${URL}images/${imageId}`, {
      method: "PATCH",
      body: JSON.stringify({
        is_cover: true
      }),
      headers: {
        "Content-type": "application/json",
        Accept: "application/json"
      }
    })
      .then(r => r.json())
      .then(
        _ =>
          oldCoverId
            ? dispatch(unsetImageFromCover(oldCoverId))
            : dispatch(fetchProjects())
      );
  };
}

export {
  fetchProjects,
  createNewProject,
  deleteProject,
  updateProject,
  createNewStep,
  deleteStep,
  addNewImage,
  uploadNewImage,
  deleteImage,
  setImageToCover
};
