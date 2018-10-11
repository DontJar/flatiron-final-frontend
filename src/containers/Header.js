import React from "react";
import {
  Dropdown,
  Image,
  Icon,
  Menu,
  Segment,
  Header,
  Container
} from "semantic-ui-react";
import { Link, NavLink, withRouter } from "react-router-dom";

import loggrLogo from "../log.svg";

const NavBar = () => (
  <Menu attached="top">
    <Container>
      <Dropdown item icon="bars" simple>
        <Dropdown.Menu>
          <Dropdown.Header>All Projects</Dropdown.Header>
          <Dropdown.Item>
            <Icon name="dropdown" />
            <span className="text">New</span>
            <Dropdown.Menu>
              <Dropdown.Item>New Project</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown.Item>
          <Dropdown.Item>
            <NavLink to="/index">Project Index</NavLink>
          </Dropdown.Item>
          <Dropdown.Item>(?)Share a project(?)</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Menu.Item
        as="a"
        header
        style={{ flex: "auto", "justify-content": "flex-end" }}
        floated="right"
      >
        Loggr
        <NavLink to="/">
          <Image src={loggrLogo} style={{ height: "2em" }} />
        </NavLink>
      </Menu.Item>
    </Container>
  </Menu>
);

export default NavBar;
