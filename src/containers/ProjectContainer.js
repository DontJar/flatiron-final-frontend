import React from "react";
import { connect } from "react-redux";
import { Button, Segment, Dimmer, Loader } from "semantic-ui-react";
import { withRouter } from "react-router";
import { deleteProject } from "../redux/actions";

import ProjectCover from "../components/ProjectCover";
import ProjectStep from "../components/ProjectStep";
import NewStepModalForm from "../components/NewStepModalForm";

class ProjectContainer extends React.Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     editingDescription: false
  //   };
  // }

  handleDeleteClick = () => {
    this.props.history.push("/");
    this.props.deleteProject(this.props.project.id);
  };

  render() {
    return (
      <div>
        {!this.props.project ? (
          <Segment>
            <Dimmer active inverted>
              <Loader style={{ marginTop: "12em" }} inverted>
                Loading
              </Loader>
            </Dimmer>
          </Segment>
        ) : (
          <div>
            <div>
              <ProjectCover project={this.props.project} />
              {this.props.project &&
                this.props.project.steps &&
                this.props.project.steps.map(step => (
                  <ProjectStep thisStep={step} key={step.id} />
                ))}
              <NewStepModalForm />
              <br />
              <Button
                floated="right"
                onClick={this.handleDeleteClick}
                color="red"
              >
                Delete this Project
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, propsFromParent) => {
  return {
    project: propsFromParent.project
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    { deleteProject }
  )(ProjectContainer)
);
