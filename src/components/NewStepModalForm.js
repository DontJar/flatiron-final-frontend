import React from "react";
import { Modal, Button, Form, Segment } from "semantic-ui-react";
import { withRouter } from "react-router";
import { connect } from "react-redux";

import { createNewStep } from "../redux/actions";

class NewStepModalForm extends React.Component {
  constructor() {
    super();
    this.state = {
      modalOpen: false,
      project_id: "",
      description: "",
      imageUrl: "",
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

  submitHandler(e) {
    this.toggleModal();
    this.props.createNewStep(this.state);
    this.setState({
      description: "",
      imageUrl: "",
      isChecked: false
    });
  }

  render() {
    return (
      <Modal
        trigger={
          <Button attached="bottom" onClick={() => this.toggleModal()}>
            Add Step
          </Button>
        }
        open={this.state.modalOpen}
        content={
          <Segment inverted>
            <Form inverted onSubmit={event => this.submitHandler(event)}>
              <Form.Group widths="equal">
                <Form.TextArea
                  fluid
                  label="Add a new step"
                  placeholder="Enter a description for this step"
                  value={this.state.description}
                  onChange={e => this.handelChange(e)}
                />
                {!this.state.isChecked ? (
                  <Form.Input
                    fluid
                    label="Image URL"
                    placeholder="Enter a URL for this step's first image"
                    value={this.state.imageUrl}
                    onChange={e => this.handelUrlChange(e)}
                  />
                ) : (
                  <Form.Input
                    disabled
                    fluid
                    label="Image URL"
                    placeholder="Enter a URL for this step's first image"
                    value={this.state.imageUrl}
                  />
                )}
              </Form.Group>
              <Form.Checkbox
                label="No Image yet!"
                value={this.state.isChecked}
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
  return { createNewStep: newStep => dispatch(createNewStep(newStep)) };
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(NewStepModalForm)
);
