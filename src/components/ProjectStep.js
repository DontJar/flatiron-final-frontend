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
    imageOpen: false,
    selectedImagePos: 0
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

  setSelectedImage = pos => {
    this.setState({
      selectedImagePos: pos
    });
  };

  render() {
    const { open } = this.state;
    return (
      <div>
        {this.props.thisStep.images.length > 0 ? (
          <a href={this.props.thisStep.images[this.state.selectedImagePos].url}>
            <Image
              src={
                this.props.thisStep.images[this.state.selectedImagePos]
                  .smaller_url
                  ? this.props.thisStep.images[this.state.selectedImagePos]
                      .smaller_url
                  : this.props.thisStep.images[this.state.selectedImagePos].url
              }
              style={{ margin: "auto" }}
            />
          </a>
        ) : (
          <Image centered size="tiny" src={noImage} />
        )}
        {this.props.thisStep.images.length > 1 ? (
          <div>
            <Card.Group centered itemsPerRow={4} style={{ margin: ".5em" }}>
              {this.props.thisStep.images.map(image => (
                <Card centered key={image.id}>
                  <StepImage
                    image={image}
                    setSelectedImage={this.setSelectedImage}
                    imagePos={this.props.thisStep.images.indexOf(image)}
                  />
                </Card>
              ))}
            </Card.Group>
          </div>
        ) : null}

        <div
          className="ui segment"
          style={{ marginLeft: "1em", marginRight: "1em" }}
        >
          <div
            className="ui top left attached label"
            style={{ width: "-webkit-fill-available" }}
          >
            Step {this.props.stepNumber}:
          </div>
          <p className="stepDesc" style={{ textIndent: "25px" }}>
            {this.props.thisStep.description}
          </p>
        </div>

        <ShowStepImages images={this.props.thisStep.images} />
        <br />
        <div style={{ marginLeft: "1em", marginRight: "1em" }}>
          <Button onClick={this.deleteWarning}>Remove Step</Button>

          <Confirm
            open={open}
            content="Click to view or delete this image."
            cancelButton="cancel"
            // viewButton="view"
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
