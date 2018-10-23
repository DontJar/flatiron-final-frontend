import React from "react";
import { Dropdown, Image, Menu } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router";

import NewProject from "../components/NewProject";
import loggrLogo from "../log.svg";

// debugger;

const NavBar = props => (
  <Menu fixed="top">
    {/* <Container> */}
    <Dropdown item icon="bars" simple>
      <Dropdown.Menu>
        <Dropdown.Item
          onClick={() => props.history.push("/about")}
          text="About Loggr"
          icon="question"
        />
        <NewProject />
      </Dropdown.Menu>
    </Dropdown>

    <Menu.Menu position="right" style={{ margin: ".5em" }}>
      Loggr
      <NavLink to="/index">
        <Image src={loggrLogo} style={{ height: "2em" }} />
      </NavLink>
    </Menu.Menu>

    {/* </Container> */}
  </Menu>
);

export default withRouter(NavBar);
