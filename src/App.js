import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import "./App.css";
import Header from "./containers/Header";
import Main from "./containers/Main";
import ProjectsIndex from "./containers/ProjectsIndex";

class App extends Component {
  constructor() {
    super();
    this.state = {
      projects: []
    };
  }

  componentDidMount = () => {
    this.fetchProjects();
  };

  fetchProjects = () => {
    fetch("http://localhost:3000/api/v1/projects")
      .then(r => r.json())
      .then(json =>
        this.setState({
          projects: json
        })
      );
  };

  render() {
    // debugger;
    console.log("App.js is 🚀");
    return (
      <div>
        <Header />
        <Switch>
          <Route
            exact
            path="/"
            render={() => <Main projects={this.state.projects} />}
          />
          <Route
            exact
            path="/index"
            render={() => <ProjectsIndex projects={this.state.projects} />}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
