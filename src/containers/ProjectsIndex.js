import React from "react";
import { Card, Button, Input } from "semantic-ui-react";

import ProjectCard from "../components/ProjectCard";

const ProjectsIndex = props => {
  // debugger;
  return (
    <div>
      <Input icon="search" placeholder="Search..." />

      <Card.Group centered itemsPerRow={3} style={{ margin: "auto" }}>
        {props.projects &&
          props.projects.map(project => <ProjectCard project={project} />)}
      </Card.Group>
    </div>
  );
};

export default ProjectsIndex;
