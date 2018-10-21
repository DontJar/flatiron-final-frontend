import React from "react";
import { Card, Button } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import ProjectCard from "../components/ProjectCard";

const ProjectsGrid = state => {
  const sliderHeight = window.screen.height - 30;
  return (
    <div>
      <NavLink to="/index">
        <Button>Project Index</Button>
      </NavLink>
      <br />
      <div>
        {state.projects &&
          state.projects.map(project => (
            <Card.Group
              key={project.id}
              itemsPerRow={2}
              style={{ margin: "auto" }}
            >
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

export default connect(mapStateToProps)(ProjectsGrid);
