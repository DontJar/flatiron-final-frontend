import React from "react";
import { Image, Button, Confirm } from "semantic-ui-react";

import { connect } from "react-redux";

import noImage from "../no-image.png";
import { deleteStep } from "../redux/actions";

class ProjectStep extends React.Component {
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
    console.log("'Confirm' clicked");
    this.setState({
      open: false
    });
    // console.log(this.props.thisStep.id);
    this.props.deleteStep(this.props.thisStep.id);
  };

  render() {
    const { open } = this.state;
    return (
      <div>
        {this.props.thisStep.images.length > 0 ? (
          <Image src={this.props.thisStep.images[0].url} />
        ) : (
          <Image centered size="tiny" src={noImage} />
        )}
        <div>In this step: {this.props.thisStep.description}</div>
        <Button onClick={this.deleteWarning}>Remove Step</Button>
        <Confirm
          open={open}
          content="Confirm that you would like to remove this step."
          cancelButton="cancel"
          confirmButton="DELETE"
          onCancel={this.handleCancel}
          onConfirm={this.handleConfirm}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return { deleteStep: stepId => dispatch(deleteStep(stepId)) };
};

// export default ProjectStep;

export default connect(
  null,
  mapDispatchToProps
)(ProjectStep);
