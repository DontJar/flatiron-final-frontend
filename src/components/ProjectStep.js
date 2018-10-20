import React from "react";
import { Image, Button, Confirm, Card } from "semantic-ui-react";

import { connect } from "react-redux";

import noImage from "../no-image.png";
import { deleteStep } from "../redux/actions";
import StepImage from "./StepImage";
import ShowStepImages from "./ShowStepImages";
import NewImageModal from "./NewImageModal";

class ProjectStep extends React.Component {
  state = {
    open: false,
    imageOpen: false
  };

  deleteWarning = () => {
    this.setState({
      open: true
    });
  };

  handleCancel = () => {
    this.setState({
      open: false
    });
  };

  handleConfirm = () => {
    this.setState({
      open: false
    });
    this.props.deleteStep(this.props.thisStep.id);
  };

  render() {
    const { open } = this.state;
    return (
      <div>
        {this.props.thisStep.images.length > 0 ? (
          <a href={this.props.thisStep.images[0].url}>
            <Image src={this.props.thisStep.images[0].url} />
          </a>
        ) : (
          <Image centered size="tiny" src={noImage} />
        )}
        {this.props.thisStep.images.length > 1 ? (
          <div>
            <Card.Group centered itemsPerRow={3} style={{ margin: "auto" }}>
              {this.props.thisStep.images.slice(1).map(image => (
                <Card centered key={image.id}>
                  <StepImage image={image} />
                </Card>
              ))}
            </Card.Group>
          </div>
        ) : null}
        <div style={{ marginLeft: "1em", marginRight: "1em" }}>
          In this step: {this.props.thisStep.description}
        </div>
        <ShowStepImages images={this.props.thisStep.images} />
        <br />
        <div style={{ marginLeft: "1em", marginRight: "1em" }}>
          <Button onClick={this.deleteWarning}>Remove Step</Button>

          <Confirm
            open={open}
            content="Click to view or delete this image."
            cancelButton="cancel"
            viewButton="view"
            confirmButton="DELETE"
            onCancel={this.handleCancel}
            onConfirm={this.handleConfirm}
          />
          <NewImageModal stepId={this.props.thisStep.id} />
        </div>
        <br />
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
