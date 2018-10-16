import React from "react";
import { Card, Input } from "semantic-ui-react";
import { connect } from "react-redux";

import ProjectCard from "../components/ProjectCard";

const ProjectsIndex = props => {
  return (
    <div style={{ "margin-top": "5em" }}>
      <div>
        <Input icon="search" placeholder="Search..." />
      </div>
      <Card.Group centered itemsPerRow={3} style={{ margin: "auto" }}>
        {props.projects &&
          props.projects.map(project => <ProjectCard project={project} />)}
      </Card.Group>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    projects: state.projects
  };
};

export default connect(mapStateToProps)(ProjectsIndex);
