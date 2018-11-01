import React, { Component } from "react";
import { Dropdown, Image, Menu } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import NewProjectModal from "../modals/NewProjectModal";
import log from "../Images/log.png";

class NavBar extends Component {
  render() {
    // this is being used to sort projects by most recenly updated
    const recentUpdates = this.props.projects
      .sort((a, b) => new Date(a.updated_at) - new Date(b.updated_at))
      .slice(-3);
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
            <Dropdown.Divider />
            <Dropdown.Header>Recently Updated</Dropdown.Header>
            {recentUpdates[0] && (
              <NavLink to={`/projects/${recentUpdates[0].id}`}>
                <Dropdown.Item icon="images" text={recentUpdates[0].title} />
              </NavLink>
            )}
            {recentUpdates[1] && (
              <NavLink to={`/projects/${recentUpdates[1].id}`}>
                <Dropdown.Item icon="images" text={recentUpdates[1].title} />
              </NavLink>
            )}
            {recentUpdates[2] && (
              <NavLink to={`/projects/${recentUpdates[2].id}`}>
                <Dropdown.Item icon="images" text={recentUpdates[2].title} />
              </NavLink>
            )}
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
