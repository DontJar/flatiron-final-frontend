import React from "react";
import { Card, Input } from "semantic-ui-react";
import { connect } from "react-redux";

import ProjectImagesIndex from "../components/ProjectCard";

const ProjectsIndex = props => {
  return (
    <div style={{ marginTop: "5em" }}>
      <div>
        <Input icon="search" placeholder="Search..." />
      </div>
      <Card.Group centered itemsPerRow={3} style={{ margin: "auto" }}>
        {props.projects &&
          props.projects.map(project => <ImageCard project={project} />)}
      </Card.Group>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    projects: state.projects
  };
};

export default connect(mapStateToProps)(ProjectImagesIndex);
