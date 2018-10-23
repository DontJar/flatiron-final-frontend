import React from "react";
import { Modal, Button, Form, Segment, Icon } from "semantic-ui-react";
import { withRouter } from "react-router";
import { connect } from "react-redux";

import { addNewImage, uploadNewImage } from "../redux/actions";

class NewImageModal extends React.Component {
  constructor() {
    super();
    this.state = {
      modalOpen: false,
      step_id: "",
      imageUrl: ""
    };
  }

  toggleModal() {
    this.setState({
      modalOpen: !this.state.modalOpen
    });
  }

  handelUrlChange(e) {
    this.setState({
      // project_id: this.props.stepId,
      imageUrl: e.target.value
    });
  }

  handleBoxClick() {
    this.setState({
      imageUrl: ""
    });
  }

  submitHandler(e) {
    this.toggleModal();
    e.target.querySelector("#step_image").files.length > 0
      ? this.props.uploadNewImage(
          this.props.stepId,
          e.target.querySelector("#step_image").files[0]
        )
      : this.props.addNewImage(this.props.stepId, this.state.imageUrl);
    this.setState({
      imageUrl: ""
    });
  }

  onChangeFile() {
    const fileButton = document.getElementById(this.id);
    const file = fileButton && fileButton.files[0];
    if (this.props.onSelect) {
      this.props.onSelect(file);
    }
  }

  render() {
    // debugger;
    return (
      <Modal
        trigger={
          <Button
            style={{ marginLeft: "1em", marginRight: "1em" }}
            onClick={() => this.toggleModal()}
            Icon
            name="camera"
            floated="right"
            color="blue"
          >
            <Icon name="camera" />
            Add Image
          </Button>
        }
        open={this.state.modalOpen}
        content={
          <Segment inverted>
            <Form inverted onSubmit={event => this.submitHandler(event)}>
              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  label="Enter image URL"
                  placeholder="Enter a URL for this step's first image"
                  value={this.state.imageUrl}
                  onChange={e => this.handelUrlChange(e)}
                />

                <div className="field">
                  <label>
                    Choose a file or take a picture <span>📷</span>
                  </label>
                  <input
                    type="file"
                    id="step_image"
                    name="step_image"
                    accept="image/*"
                  />
                </div>
              </Form.Group>
              <br />
              <Button type="submit">Submit</Button>
              <Button
                icon="delete"
                floated="right"
                onClick={() => this.toggleModal()}
              />
            </Form>
          </Segment>
        }
      />
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addNewImage: (stepId, newImage) => dispatch(addNewImage(stepId, newImage)),
    uploadNewImage: (stepId, newImageFile) =>
      dispatch(uploadNewImage(stepId, newImageFile))
  };
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(NewImageModal)
);
