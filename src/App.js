import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { Sticky } from "semantic-ui-react";

import "./App.css";
import Header from "./containers/Header";
import Main from "./containers/Main";
import ProjectsIndex from "./containers/ProjectsIndex";
import ProjectContainer from "./containers/ProjectContainer";
import { fetchProjects } from "./redux/actions";

class App extends Component {
  componentDidMount() {
    this.props.fetchProjects();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" render={() => <Main />} />
          <Route exact path="/index" render={() => <ProjectsIndex />} />

          <Route
            path="/projects/:id"
            render={data => {
              let targetID = parseInt(data.match.params.id, 10);
              let targetProject = this.state.projects.filter(
                project => project.id === targetID
              )[0];
              return <ProjectContainer project={targetProject} />;
            }}
          />
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = state => {
  return {
    projects: state.projects
  };
};

export default connect(
  mapDispatchToProps,
  { fetchProjects }
)(App);
