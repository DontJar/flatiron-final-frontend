import React from "react";
import { Card, Segment, Dimmer } from "semantic-ui-react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import spinner from "../Images/loggr spinner.gif";

import ProjectCard from "../components/ProjectCard";
import NewProjectModal from "../modals/NewProjectModal";

class ProjectsIndex extends React.Component {
  constructor() {
    super();
    this.state = {
      searchTerm: ""
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  searchChange(e) {
    this.setState({
      searchTerm: e.target.value
    });
  }

  render() {
    return !this.props.projects ? (
      <Segment>
        <Dimmer active inverted>
          <img src={spinner} alt="loading..." style={{ marginTop: "12em" }} />
        </Dimmer>
      </Segment>
    ) : (
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
        <NewProjectModal />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    projects: state.projects
  };
};

export default withRouter(connect(mapStateToProps)(ProjectsIndex));
