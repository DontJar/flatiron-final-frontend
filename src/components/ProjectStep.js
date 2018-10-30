import React from "react";
import { Image, Button, Confirm, Card, Icon } from "semantic-ui-react";

import { connect } from "react-redux";

import noImage from "../Images/no-image.png";
import { deleteStep } from "../redux/actions";
import StepImage from "./StepImage";
import ShowStepImages from "../modals/ShowStepImagesModal";
import NewImageModal from "../modals/NewImageModal";

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

  setSelectedImage = (pos, stepId) => {
    const element = document.getElementById(`stepCoverImage ${stepId}`);
    const offset = -27;
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = element.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - offset;
    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    });
    // document.getElementById(`stepCoverImage ${stepId}`).scrollIntoView({top: "3em", behavior: "instant"});
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
              id={`stepCoverImage ${this.props.thisStep.id}`}
              src={
                this.props.thisStep.images[this.state.selectedImagePos]
                  .smaller_url
                  ? this.props.thisStep.images[this.state.selectedImagePos]
                      .smaller_url
                  : this.props.thisStep.images[this.state.selectedImagePos].url
              }
              style={{
                margin: "auto",
                objectFit: "cover",
                width: "415px",
                height: "415px"
              }}
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
          <NewImageModal stepId={this.props.thisStep.id} />
          <Button
            onClick={this.deleteWarning}
            color="red"
            style={{ float: "right", marginTop: "0em", marginRight: "1em" }}
          >
            Delete Step
            <Icon name="trash alternate icon" style={{ marginLeft: ".5em" }} />
          </Button>
          <Confirm
            open={open}
            content="Click to view or delete this image."
            cancelButton="cancel"
            confirmButton="DELETE"
            onCancel={this.handleCancel}
            onConfirm={this.handleConfirm}
          />
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
