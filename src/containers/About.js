import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import haveIdea from "../Images/idea.png";
import logProgress from "../Images/logProgress.png";
import enjoyWork from "../Images/enjoyWork.png";

import NewProjectModal from "../modals/NewProjectModal";

class About extends Component {
  render() {
    return (
      <div style={{ width: "100%", textAlign: "center" }}>
        <div style={{ marginTop: "6em", display: "inline-block" }}>
          <NavLink to="/index">
            <img
              src={haveIdea}
              style={{ height: "7em", marginLeft: "2em" }}
              alt="start"
            />
          </NavLink>
          <div style={{ marginLeft: "1em" }}>Start something new</div>
          <NavLink to="/index">
            <img
              src={logProgress}
              style={{ height: "7em", marginTop: "3em" }}
              alt="log"
            />
          </NavLink>
          <div style={{ marginLeft: "1em" }}>Log your progress</div>
          <NavLink to="/index">
            <img
              src={enjoyWork}
              style={{ height: "7em", marginTop: "3em" }}
              alt="enjoy"
            />
          </NavLink>
          <div style={{ marginLeft: "1em" }}>Enjoy your hard work</div>
          <NewProjectModal />
        </div>
      </div>
    );
  }
}

export default About;
