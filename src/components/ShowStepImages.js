import React from "react";
import { Modal, Button, Segment, Confirm } from "semantic-ui-react";
import { withRouter } from "react-router";
import { connect } from "react-redux";

import noImage from "../no-image.png";
// import deleteIcon from "../delete.png";
import deleteX from "../deleteX.png";
// import trash from "../trash.png";
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
            View/Delete images
          </Button>
        }
        open={this.state.modalOpen}
        content={
          <Segment inverted>
            {this.props.images.map(image => (
              <div
                key={image.id}
                className="ui raised card"
                style={{ marginLeft: "auto", marginRight: "auto" }}
              >
                <div className="content" style={{ marginBottom: "2.5em" }}>
                  {image.url ? (
                    <div className="imageContainer" id={image.id}>
                      <img
                        src={image.smaller_url ? image.smaller_url : image.url}
                        className="ui image"
                        alt={image.url}
                      />

                      <img
                        className="deleteBtn"
                        src={deleteX}
                        alt="delete"
                        onClick={e => this.deleteWarning(e)}
                      />
                      <Confirm
                        style={{ marginTop: "15em" }}
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
                    <img src={noImage} className="ui image" alt="noImage" />
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
