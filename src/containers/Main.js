import React, { Component } from "react";
import { Grid } from "semantic-ui-react";

import NewProject from "../components/NewProject";

import ProjectsGrid from "./ProjectsGrid";

class Main extends Component {
  render() {
    // debugger;
    return (
      <div style={{ marginTop: "4em" }}>
        <ProjectsGrid />
      </div>
    );
  }
}

export default Main;
