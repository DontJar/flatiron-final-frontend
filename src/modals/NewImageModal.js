import React from "react";
import {
  Modal,
  Button,
  Form,
  Segment,
  Icon,
  Dimmer,
  Loader
} from "semantic-ui-react";
import { withRouter } from "react-router";
import { connect } from "react-redux";

import { addNewImage, uploadNewImage } from "../redux/actions";

class NewImageModal extends React.Component {
  constructor() {
    super();
    this.state = {
      modalOpen: false,
      step_id: "",
      imageUrl: "",
      isLoading: false
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
    this.setState({
      isLoading: true
    });
    this.toggleModal();
    e.target.querySelector("#step_image").files.length > 0
      ? this.props.uploadNewImage(
          this.props.stepId,
          e.target.querySelector("#step_image").files[0],
          this.isLoaded
        )
      : this.props.addNewImage(
          this.props.stepId,
          this.state.imageUrl,
          this.isLoaded
        );
    this.setState({
      imageUrl: ""
    });
  }

  isLoaded = () => {
    this.setState({
      modalOpen: false,
      isLoading: false,
      imageUrl: ""
    });
  };

  onChangeFile() {
    const fileButton = document.getElementById(this.id);
    const file = fileButton && fileButton.files[0];
    if (this.props.onSelect) {
      this.props.onSelect(file);
    }
  }

  render() {
    return (
      <Modal
        trigger={
          <Button
            style={{ marginLeft: "1em", marginRight: "1em" }}
            onClick={() => this.toggleModal()}
            name="camera"
            floated="left"
            color="blue"
          >
            <Icon name="camera" />
            Add Image
          </Button>
        }
        open={this.state.modalOpen}
        content={
          this.state.isLoading ? (
            <Segment inverted>
              <Dimmer active inverted>
                <Loader style={{ marginTop: "12em" }} inverted>
                  Loading
                </Loader>
              </Dimmer>
            </Segment>
          ) : (
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
                    <label>Choose a file or take a picture</label>
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
          )
        }
      />
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addNewImage: (stepId, newImage, isLoaded) =>
      dispatch(addNewImage(stepId, newImage, isLoaded)),
    uploadNewImage: (stepId, newImageFile, isLoaded) =>
      dispatch(uploadNewImage(stepId, newImageFile, isLoaded))
  };
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(NewImageModal)
);
