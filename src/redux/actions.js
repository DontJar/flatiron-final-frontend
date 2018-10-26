// const URL = "http://localhost:3000/api/v1/";
// switcher-oo for mobile use
// const URL = "http://10.113.107.46:3000/api/v1/";

const URL = "https://intense-fjord-82978.herokuapp.com/api/v1/";

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

function createNewProject(pushFunct, newProject) {
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
      .then(json => {
        pushFunct(`/projects/${json.id}`);
        dispatch(fetchProjects());
      });
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
      .then(json => {
        // console.log(
        //   `createNewStep - newStep: ${newStep} imageFile: ${imageFile} ${json}`
        // );
        imageFile
          ? dispatch(uploadNewImage(json.id, imageFile))
          : dispatch(addNewImage(json.id, newStep.imageUrl));
      });
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

function addNewImage(stepId, imageUrl, isLoaded) {
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
      .then(_ => {
        isLoaded && isLoaded();
        dispatch(fetchProjects());
      });
  };
}

function uploadNewImage(stepId, fileToUpload, isLoaded) {
  let formData = new FormData();
  formData.append("step_id", stepId);
  formData.append("step_image", fileToUpload);
  return dispatch => {
    fetch(`${URL}images`, {
      method: "POST",
      body: formData
    })
      .then(r => r.json())
      // .then(json => console.log(json));
      .then(_ => {
        isLoaded && isLoaded();
        dispatch(fetchProjects());
      });
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

function setImageToCover(imageId, projectId) {
  return dispatch => {
    fetch(`${URL}projects/${projectId}`, {
      method: "PATCH",
      body: JSON.stringify({
        cover_image_id: imageId
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
