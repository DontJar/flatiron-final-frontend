// ✔️

import React, { Component } from "react";
import { Modal, Button, Segment, Form, Dropdown } from "semantic-ui-react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { createNewProject } from "../redux/actions";

import plusPNG from "../Images/plus_one.png";

class NewProjectModal extends Component {
  constructor() {
    super();
    this.state = {
      modalOpen: false,
      projectName: "",
      projectDecription: ""
    };
  }

  toggleModal() {
    this.setState({
      modalOpen: !this.state.modalOpen
    });
  }

  handelNameChange(e) {
    this.setState({
      projectName: e.target.value
    });
  }

  handelDescriptionChange(e) {
    this.setState({
      projectDecription: e.target.value
    });
  }

  submitChecker() {
    this.state.projectName.length < 1
      ? alert("Please enter a project title")
      : this.submitHandler();
  }

  submitHandler() {
    this.props.createNewProject(this.props.history.push, {
      title: this.state.projectName,
      description: this.state.projectDecription
    });
    this.setState({
      modalOpen: false,
      projectName: "",
      projectDecription: ""
    });
  }

  render() {
    return (
      <Modal
        trigger={
          this.props.isMenu ? (
            <Dropdown.Item
              onClick={() => this.toggleModal()}
              text="Create new project"
              icon="plus circle"
            />
          ) : (
            <div>
              <div className="arrow bounce" />

              <img
                onClick={() => this.toggleModal()}
                alt="arrow"
                style={{
                  position: "fixed",
                  bottom: "15px",
                  right: "15px",
                  height: "70px"
                }}
                src={plusPNG}
              />
            </div>
          )
        }
        open={this.state.modalOpen}
        content={
          <Segment inverted>
            <Form inverted onSubmit={event => this.submitChecker(event)}>
              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  label="Name your new project"
                  placeholder="Project name"
                  value={this.state.projectName}
                  onChange={e => this.handelNameChange(e)}
                />
                <div className="field">
                  <label>Describe your project</label>
                  <div className="ui fluid input">
                    <textarea
                      placeholder="Project description"
                      value={this.state.projectDecription}
                      onChange={e => this.handelDescriptionChange(e)}
                    />
                  </div>
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
    createNewProject: (pushFunct, newProject) =>
      dispatch(createNewProject(pushFunct, newProject))
  };
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(NewProjectModal)
);
