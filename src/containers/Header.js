import React from "react";
import { Dropdown, Image, Menu } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router";

import NewProjectModal from "../modals/NewProjectModal";
import log from "../Images/log.png";

const NavBar = props => (
  <Menu fixed="top">
    <Dropdown item icon="bars" simple>
      <Dropdown.Menu>
        <Dropdown.Item
          onClick={() => props.history.push("/about")}
          text="About Loggr"
          icon="question"
        />
        <NewProjectModal isMenu="true" />
      </Dropdown.Menu>
    </Dropdown>

    <Menu.Menu position="right" style={{ margin: ".5em" }}>
      <NavLink to="/index">
        <Image src={log} style={{ height: "1.75em" }} />
      </NavLink>
    </Menu.Menu>
  </Menu>
);

export default withRouter(NavBar);
