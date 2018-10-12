const initialState = {
  projects: []
};

const rootReducer = (state = initialState, action) => {
  /*just an example model to follow below */
  switch (action.type) {
    case "UPDATE_STORE_WITH_ALL_PROJECTS":
      return {
        projects: action.projects
      };

    default:
      return state;
  }
};

export default rootReducer;
