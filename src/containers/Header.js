import React from "react";
import { Dropdown, Image, Icon, Menu, Container } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

import loggrLogo from "../log.svg";

const NavBar = () => (
  <Menu fixed="top">
    <Container>
      <Dropdown item icon="bars" simple>
        <Dropdown.Menu>
          <Dropdown.Item>
            <NavLink to="/index">
              <Dropdown.Header>All Projects</Dropdown.Header>
            </NavLink>
          </Dropdown.Item>
          <Dropdown.Item>
            <Icon name="dropdown" />
            <span className="text">New</span>
            <Dropdown.Menu>
              <Dropdown.Item>New Project</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown.Item>
          <Dropdown.Item>Share a project(</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Menu.Menu position="right" style={{ margin: ".5em" }} header>
        Loggr
        <NavLink to="/">
          <Image src={loggrLogo} style={{ height: "2em" }} />
        </NavLink>
      </Menu.Menu>
      {/* </div> */}
    </Container>
  </Menu>
);

export default NavBar;
