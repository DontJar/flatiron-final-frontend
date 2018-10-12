import React from "react";
import ProjectCover from "../components/ProjectCover";
import { connect } from "react-redux";

const ProjectContainer = props => {
  debugger;
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

const mapStateToProps = state => {
  return {
    project: state.project
  };
};

export default connect(mapStateToProps)(ProjectContainer);
