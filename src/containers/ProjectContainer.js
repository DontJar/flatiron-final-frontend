import React from "react";
import { connect } from "react-redux";
import {
  Button,
  Segment,
  Dimmer,
  Loader,
  Confirm,
  Divider,
  Icon
} from "semantic-ui-react";
import { withRouter } from "react-router";
import { deleteProject } from "../redux/actions";

import ProjectCover from "../components/ProjectCover";
import ProjectStep from "../components/ProjectStep";
import NewStepModalForm from "../components/NewStepModalForm";

class ProjectContainer extends React.Component {
  state = {
    open: false
  };

  deleteWarning = () => {
    this.setState({
      open: true
    });
  };

  handleCancel = () => {
    console.log("'Cancel' clicked");
    this.setState({
      open: false
    });
  };

  handleConfirm = () => {
    this.setState({
      open: false
    });
    this.props.history.push("/");
    this.props.deleteProject(this.props.project.id);
  };

  render() {
    const { open } = this.state;
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
                  <div key={step.id}>
                    <ProjectStep thisStep={step} />
                    <Divider />
                  </div>
                ))}
              <br />
              <NewStepModalForm />
              <br />
              <Button floated="right" onClick={this.deleteWarning} color="red">
                <Icon name="delete" />
                Delete this Project
              </Button>
              <Confirm
                open={open}
                content="Confirm that you would like to delete this entire project this step."
                cancelButton="cancel"
                confirmButton="DELETE"
                onCancel={this.handleCancel}
                onConfirm={this.handleConfirm}
              />
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
