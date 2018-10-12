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

function createNewProject(newProjectName) {
  return dispatch => {
    fetch(`${URL}projects`, {
      method: "POST",
      body: JSON.stringify({
        title: newProjectName
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
  // debugger;
  // console.log(`${URL}projects\${projectId}`);
  return dispatch => {
    fetch(`${URL}projects/` + projectId, {
      method: "DELETE",
      body: JSON.stringify({ id: projectId })
    })
      .then(r => r.json())
      .then(json => dispatch(fetchProjects()));
  };
}

export { fetchProjects, createNewProject, deleteProject };
