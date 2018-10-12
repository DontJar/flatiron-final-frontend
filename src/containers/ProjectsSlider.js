import React from "react";
import { Card, Button } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import ProjectCard from "../components/ProjectCard";

const ProjectsSlider = state => {
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
        {state.projects &&
          state.projects.map(project => (
            <Card.Group>
              <ProjectCard project={project} />
            </Card.Group>
          ))}
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return { projects: state.projects };
};

export default connect(mapStateToProps)(ProjectsSlider);
