import React from "react";
import { Image, Input } from "semantic-ui-react";
import { connect } from "react-redux";

import plusPNG from "../plus.png";
import { createNewProject } from "../redux/actions";

class NewProject extends React.Component {
  constructor() {
    super();
    this.state = { newProjectName: "" };
  }

  handleChange(e) {
    this.setState({
      newProjectName: e.target.value
    });
  }

  render() {
    return (
      <div>
        <h2 style={{ display: "flex", "justify-content": "center" }}>
          Start a new project
        </h2>
        <div>
          <Image
            size="tiny"
            style={{
              position: "absolute",
              "margin-top": "12em",
              left: "33.25%"
            }}
            src={plusPNG}
            onClick={() =>
              this.props.createNewProject(this.state.newProjectName)
            }
          />
          <Input
            fluid
            style={{ "margin-top": "5em" }}
            placeholder="Project name..."
            value={this.state.name}
            onChange={e => this.handleChange(e)}
          />
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

export default connect(
  null,
  mapDispatchToProps
)(NewProject);
