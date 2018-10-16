import React from "react";
import { Modal, Button, Form, Segment, Icon } from "semantic-ui-react";
import { withRouter } from "react-router";
import { connect } from "react-redux";

import { addNewImage } from "../redux/actions";

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
    // debugger;
    this.toggleModal();
    this.props.addNewImage(this.props.stepId, this.state.imageUrl);
    this.setState({
      imageUrl: ""
    });
  }

  render() {
    // debugger;
    return (
      <Modal
        trigger={
          <Button
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
                  label="Enter Image URL"
                  placeholder="Enter a URL for this step's first image"
                  value={this.state.imageUrl}
                  onChange={e => this.handelUrlChange(e)}
                />
              </Form.Group>

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
    addNewImage: (stepId, newImage) => dispatch(addNewImage(stepId, newImage))
  };
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(NewImageModal)
);
