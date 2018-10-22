import React from "react";
import { Image, Input, Form, TextArea } from "semantic-ui-react";
import { connect } from "react-redux";
// import {withRouter} from 'react-router'

import plusPNG from "../plus_too.svg";
import { createNewProject } from "../redux/actions";

class NewProject extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      description: ""
    };
  }

  handleNameChange(e) {
    this.setState({
      name: e.target.value
    });
  }

  handleDescriptionChange(e) {
    this.setState({
      description: e.target.value
    });
  }

  handleNewClick() {
    this.props.createNewProject(this.state);
    this.setState({
      name: "",
      description: ""
    });
  }

  render() {
    return (
      <div>
        <h2 style={{ display: "flex", justifyContent: "center" }}>
          Start a new project!
        </h2>
        <div>
          <Form>
            <Input
              fluid
              style={{ marginTop: "5em" }}
              placeholder="New project name..."
              value={this.state.name}
              onChange={e => this.handleNameChange(e)}
            />
            <TextArea
              style={{ marginTop: "2em", rows: "5" }}
              placeholder="Give your new project a description..."
              value={this.state.projectDecriptin}
              onChange={e => this.handleDescriptionChange(e)}
            />
            <Image
              size="tiny"
              style={{
                position: "absolute",
                marginTop: "3em",
                left: "33.25%"
              }}
              src={plusPNG}
              onClick={() => {
                if (this.state.name.length === 0) {
                  alert("Please enter a project name");
                } else if (this.state.description.length === 0) {
                  alert("Please enter a project description");
                } else {
                  this.handleNewClick();
                }
              }}
            />
          </Form>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createNewProject: newProject => dispatch(createNewProject(newProject))
  };
};

const mapStateToProps = state => {
  return { projects: state.projects };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewProject);
