import React from "react";
import { Card, Modal, Button, Segment, Form } from "semantic-ui-react";
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

  componentDidMount() {
    window.scrollTo(0, 0);
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

  searchChange(e) {
    this.setState({
      searchTerm: e.target.value
    });
  }

  render() {
    this.props.projects.length < 1 && this.props.history.push("/about");
    return (
      <div>
        <div style={{ marginTop: "4em", marginBottom: "6.5em" }}>
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
              value={this.state.searchTerm}
              onChange={e => this.searchChange(e)}
            />
            <i className="search icon" />
            <i aria-hidden="true" className="search icon" />
          </div>
          <Card.Group centered itemsPerRow={2} style={{ margin: "auto" }}>
            {this.props.projects &&
              this.props.projects
                .filter(project =>
                  project.title
                    .toLowerCase()
                    .includes(this.state.searchTerm.toLowerCase())
                )
                .map(project => (
                  <ProjectCard project={project} key={project.id} />
                ))}
          </Card.Group>
        </div>

        <Modal
          trigger={
            <div>
              <img
                alt="addProject"
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
