import React from "react";
import {
  Card,
  Image,
  Modal,
  Button,
  Icon,
  Segment,
  Form,
  TextArea
} from "semantic-ui-react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import { createNewProject } from "../redux/actions";
import ProjectCard from "../components/ProjectCard";
import plusPNG from "../plus_one.png";

class ProjectsIndex extends React.Component {
  constructor() {
    super();
    this.state = {
      modalOpen: false,
      searchTerm: "",
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
      <div>
        <div style={{ "margin-top": "4em" }}>
          <div
            className="ui fluid icon input"
            style={{ marginLeft: "1em", marginRight: "1em" }}
          >
            <input
              style={{
                borderRadius: "15px"
              }}
              type="text"
              placeholder="Search..."
            />
            <i class="search icon" />
            <i aria-hidden="true" className="search icon" />
          </div>
          <Card.Group centered itemsPerRow={2} style={{ margin: "auto" }}>
            {this.props.projects &&
              this.props.projects.map(project => (
                <ProjectCard project={project} />
              ))}
          </Card.Group>
        </div>
        <Modal
          trigger={
            <div>
              <img
                onClick={() => this.toggleModal()}
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
              <Form inverted onSubmit={event => this.submitHandler(event)}>
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
                    <div class="ui fluid input">
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

const mapStateToProps = state => {
  return {
    projects: state.projects
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createNewProject: (pushFunct, newProject) =>
      dispatch(createNewProject(pushFunct, newProject))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ProjectsIndex)
);
