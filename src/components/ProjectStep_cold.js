import React from "react";
import { Image, Button, Confirm, Card } from "semantic-ui-react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { connect } from "react-redux";

import noImage from "../no-image.png";
import { deleteStep, deleteImage } from "../redux/actions";
import StepImage from "./StepImage";
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

  imageDelete = () => {
    this.setState({
      imageOpen: true
    });
  };

  handleImageDelete = () => {
    this.setState({
      open: false
    });
    this.props.deleteImage(this.props.image.id);
  };

  imageHandleCancel = () => {
    console.log("clicked");
    this.setState({
      imageOpen: false
    });
  };

  render() {
    const { open } = this.state;
    return (
      <div>
        {this.props.thisStep.images[0] ? (
          <Carousel showIndicators={false} infiniteLoop={true} dynamicHeight>
            {this.props.thisStep.images.map(image => (
              <div>
                <img src={image.url} onClick={this.imageDelete} />

                <Confirm
                  open={this.imageOpen}
                  content="Confirm image delete"
                  cancelButton="cancel"
                  onCancel={this.imageHandleCancel}
                  confirmButton="DELETE"
                  onConfirm={this.handleImageDelete}
                />
              </div>
            ))}
          </Carousel>
        ) : (
          <Image centered size="tiny" src={noImage} />
        )}
        <div>In this step: {this.props.thisStep.description}</div>

        <Button onClick={this.deleteWarning}>Remove Step</Button>
        <Confirm
          open={open}
          content="Click to view or delete this image."
          cancelButton="cancel"
          viewButton="view"
          confirmButton="DELETE"
          onCancel={this.handleCancel}
          onView={this.handleView}
          onConfirm={this.handleConfirm}
        />
        <NewImageModal stepId={this.props.thisStep.id} />
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
