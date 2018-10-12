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

export { fetchProjects };
