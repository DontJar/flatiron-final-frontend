import React from "react";
import { Modal, Button, Segment, Confirm } from "semantic-ui-react";
import { withRouter } from "react-router";
import { connect } from "react-redux";

import noImage from "../no-image.png";
import deleteIcon from "../delete.png";
import { deleteImage } from "../redux/actions";

class ShowStepImages extends React.Component {
  constructor() {
    super();
    this.state = {
      modalOpen: false,
      open: false,
      imageTarget: null
    };
  }

  toggleModal() {
    this.setState({
      modalOpen: !this.state.modalOpen
    });
  }

  deleteWarning = e => {
    this.setState({
      imageTarget: e.target.parentElement.id,
      open: !this.state.open
    });
  };

  handleImageDelete = e => {
    this.toggleModal();
    this.props.deleteImage(this.state.imageTarget);
    this.setState({
      imageTarget: null
    });
  };

  render() {
    const { open } = this.state;
    return (
      <Modal
        trigger={
          <Button attached="bottom" onClick={() => this.toggleModal()}>
            Show More Images Related To This Step
          </Button>
        }
        open={this.state.modalOpen}
        content={
          <Segment inverted>
            {this.props.images.map(image => (
              <div class="ui raised card">
                <div class="content" style={{ marginBottom: "2.5em" }}>
                  {image.url ? (
                    <div className="imageContainer" id={image.id}>
                      <img
                        src={image.url}
                        className="ui image"
                        alt={image.url}
                      />
                      {/* </a> */}
                      <img
                        className="deleteBtn"
                        src={deleteIcon}
                        alt="delete"
                        onClick={e => this.deleteWarning(e)}
                      />
                      <Confirm
                        open={open}
                        imageTarget={image.id}
                        id={image.id}
                        content="Click to delete this image."
                        cancelButton="cancel"
                        confirmButton="DELETE"
                        onCancel={this.deleteWarning}
                        onConfirm={this.handleImageDelete}
                      />
                    </div>
                  ) : (
                    <img src={noImage} class="ui image" />
                  )}
                </div>
              </div>
            ))}
            <Button attached="bottom" onClick={() => this.toggleModal()}>
              Close
            </Button>
          </Segment>
        }
      />
    );
  }
}

const mapDispatchToProps = dispatch => {
  return { deleteImage: imageId => dispatch(deleteImage(imageId)) };
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(ShowStepImages)
);
