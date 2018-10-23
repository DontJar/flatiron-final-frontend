import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch, withRouter } from "react-router-dom";
// import { Sticky } from "semantic-ui-react";

import "./App.css";
import Header from "./containers/Header";

import ProjectsIndex from "./containers/ProjectsIndex";
import ProjectContainer from "./containers/ProjectContainer";
import About from "./containers/About";
import { fetchProjects } from "./redux/actions";

class App extends Component {
  componentDidMount() {
    this.props.fetchProjects();
  }

  render() {
    // debugger;
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" render={() => <ProjectsIndex />} />
          <Route path="/index" render={() => <ProjectsIndex />} />
          <Route path="/about" render={() => <About />} />
          <Route
            path="/projects/:id"
            render={data => {
              let targetID = parseInt(data.match.params.id, 10);
              let targetProject = this.props.projects.filter(
                project => project.id === targetID
              )[0];
              return (
                <ProjectContainer
                  project={targetProject}
                  // id={targetProject.id}
                />
              );
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

export default withRouter(
  connect(
    mapDispatchToProps,
    { fetchProjects }
  )(App)
);
