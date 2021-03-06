import React from "react";
import { Modal, Button, Form, Segment } from "semantic-ui-react";
import { withRouter } from "react-router";
import { connect } from "react-redux";

import { createNewStep, uploadNewImage } from "../redux/actions";
// import newStep from "../newStep.svg";
import newStep from "../Images/newStep.png";

class NewStepModalForm extends React.Component {
  constructor() {
    super();
    this.state = {
      modalOpen: false,
      project_id: "",
      description: "",
      imageUrl: "",
      imageFile: null,
      isChecked: false
    };
  }

  toggleModal() {
    this.setState({
      modalOpen: !this.state.modalOpen
    });
  }

  handelChange(e) {
    this.setState({
      description: e.target.value,
      project_id: parseInt(this.props.match.url.split("/").slice(-1)[0])
    });
  }

  handelUrlChange(e) {
    this.setState({
      imageUrl: e.target.value
    });
  }

  handleBoxClick() {
    this.setState({
      isChecked: !this.state.isChecked,
      imageUrl: ""
    });
  }

  submitChecker(e) {
    this.state.description.length < 1
      ? alert("Please enter a description")
      : this.submitHandler(e);
  }

  submitHandler(e) {
    this.toggleModal();
    e.target.querySelector("#step_image").files.length > 0
      ? this.props.createNewStep(
          this.state,
          e.target.querySelector("#step_image").files[0]
        )
      : this.props.createNewStep(this.state, null);

    this.setState({
      description: "",
      imageUrl: "",
      isChecked: false,
      imageFile: null
    });
  }

  render() {
    return (
      <Modal
        trigger={
          <div>
            <img
              alt="new step"
              onClick={() => this.toggleModal()}
              style={{
                position: "fixed",
                bottom: "15px",
                left: "15px",
                height: "70px"
              }}
              src={newStep}
            />
          </div>
        }
        open={this.state.modalOpen}
        content={
          <Segment inverted>
            <Form inverted onSubmit={event => this.submitChecker(event)}>
              <Form.Group widths="equal">
                <Form.TextArea
                  fluid=""
                  label="Add a new step"
                  placeholder="Enter a description for this step"
                  value={this.state.description}
                  onChange={e => this.handelChange(e)}
                />
                {!this.state.isChecked ? (
                  <div style={{ marginLeft: ".5em" }}>
                    <Form.Input
                      fluid
                      label="Image URL"
                      placeholder="Enter a URL for this step's first image"
                      value={this.state.imageUrl}
                      onChange={e => this.handelUrlChange(e)}
                    />
                    <br />
                    <div className="field">
                      <label>Choose a file or take a picture</label>
                      <input
                        type="file"
                        id="step_image"
                        name="step_image"
                        accept="image/*"
                      />
                    </div>
                    <br />
                  </div>
                ) : (
                  <div style={{ marginLeft: ".5em" }}>
                    <Form.Input
                      disabled
                      fluid
                      label="Image URL"
                      placeholder="Enter a URL for this step's first image"
                      value={this.state.imageUrl}
                      onChange={e => this.handelUrlChange(e)}
                    />
                    <br />
                    <div className="field">
                      <label>Choose a file or take a picture</label>
                      <input
                        disabled
                        type="file"
                        id="step_image"
                        name="step_image"
                        accept="image/*"
                      />
                    </div>
                    <br />
                  </div>
                )}
              </Form.Group>
              <Form.Checkbox
                label="No Image yet!"
                // value={this.state.isChecked}
                onChange={() => this.handleBoxClick()}
              />
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
    createNewStep: (newStep, imageFile) =>
      dispatch(createNewStep(newStep, imageFile)),
    uploadNewImage: (stepId, fileToUpload) => {
      dispatch(uploadNewImage(stepId, fileToUpload));
    }
  };
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(NewStepModalForm)
);
