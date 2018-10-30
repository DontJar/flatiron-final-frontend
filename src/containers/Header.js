import React, { Component } from "react";
import { Dropdown, Image, Menu } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import NewProjectModal from "../modals/NewProjectModal";
import log from "../Images/log.png";

class NavBar extends Component {
  render() {
    return (
      <Menu fixed="top">
        <Dropdown item icon="bars" simple>
          <Dropdown.Menu>
            <Dropdown.Item
              onClick={() => this.props.history.push("/about")}
              text="About Loggr"
              icon="question"
            />
            <NewProjectModal isMenu="true" />
            <Dropdown item text="Recently Updated">
              <Dropdown.Menu>
                <Dropdown.Item>Small</Dropdown.Item>
                <Dropdown.Item>Medium</Dropdown.Item>
                <Dropdown.Item>Large</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Dropdown.Menu>
        </Dropdown>

        <Menu.Menu position="right" style={{ margin: ".5em" }}>
          <NavLink to="/index">
            <Image src={log} style={{ height: "1.75em" }} />
          </NavLink>
        </Menu.Menu>
      </Menu>
    );
  }
}

const mapStateToProps = state => {
  return {
    projects: state.projects
  };
};

export default withRouter(connect(mapStateToProps)(NavBar));
