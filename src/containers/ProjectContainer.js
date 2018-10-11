import React from "react";
import ProjectCover from "../components/ProjectCover";

const ProjectContainer = props => {
  // debugger;
  return (
    <div>
      A Single Project's page
      {props.project ? (
        <ProjectCover project={props.project} />
      ) : (
        <div>...project loading</div>
      )}
    </div>
  );
};

export default ProjectContainer;
