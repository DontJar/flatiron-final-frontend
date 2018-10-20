import React from "react";
import { Card, Button } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import ProjectCard from "../components/ProjectCard";

const ProjectsSlider = state => {
  const sliderHeight = window.screen.height - 30;
  return (
    <div>
      <NavLink to="/index">
        <Button>Project Index</Button>
      </NavLink>
      <br />
      <div
        style={{
          overflow: "scroll",
          maxHeight: "550px",
          overflowX: "hidden"
        }}
      >
        {state.projects &&
          state.projects.map(project => (
            <Card.Group key={project.id}>
              <ProjectCard project={project} key={`project_id${project.id}`} />
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
