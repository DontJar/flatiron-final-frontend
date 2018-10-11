import React from "react";
import { Card, Button } from "semantic-ui-react";
import { Link, NavLink, withRouter } from "react-router-dom";

import ProjectCard from "../components/ProjectCard";

const ProjectsSlider = props => {
  // debugger;
  return (
    <div>
      <NavLink to="/index">
        <Button>Project Index</Button>
      </NavLink>
      <br />
      <div
        style={{
          overflow: "scroll",
          maxheight: "700px",
          "overflow-x": "hidden"
        }}
      >
        {props.projects &&
          props.projects.map(project => (
            <Card.Group>
              <ProjectCard project={project} />
            </Card.Group>
          ))}
      </div>
    </div>
  );
};

export default ProjectsSlider;
