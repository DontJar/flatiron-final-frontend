import React, { Component } from "react";
import { Grid, Image } from "semantic-ui-react";

import NewProject from "../components/NewProject";
import ProjectsSlider from "./ProjectsSlider";

class Main extends Component {
  render() {
    // debugger;
    return (
      <Grid padded>
        <Grid.Column width={10}>
          <NewProject />
        </Grid.Column>
        <Grid.Column width={6}>
          <ProjectsSlider projects={this.props.projects} />
        </Grid.Column>
      </Grid>
    );
  }
}

export default Main;
