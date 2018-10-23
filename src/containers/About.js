import React, { Component } from "react";
import { Modal, Button, Segment, Form } from "semantic-ui-react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import haveIdea from "../idea.png";
import logProgress from "../logProgress.png";
import enjoyWork from "../enjoyWork.png";
import plusPNG from "../plus_one.png";
import { createNewProject } from "../redux/actions";

class About extends Component {
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
      <div style={{ marginTop: "6em", marginLeft: "4em" }}>
        <img
          src={haveIdea}
          style={{ height: "7em", marginLeft: "2em" }}
          alt="start"
        />
        <div>Sart something new</div>
        <img
          src={logProgress}
          style={{ height: "7em", marginTop: "3em" }}
          alt="log"
        />
        <div>Log your progress along the way</div>
        <img
          src={enjoyWork}
          style={{ height: "7em", marginTop: "3em" }}
          alt="enjoy"
        />
        <div>Enjoy all your hard work</div>

        <Modal
          trigger={
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
      </div>
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
  )(About)
);
