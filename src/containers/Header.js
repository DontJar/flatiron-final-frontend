import React from "react";
import {
  Dropdown,
  Icon,
  Menu,
  Segment,
  Header,
  Container
} from "semantic-ui-react";

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
          <Dropdown.Item>(?)Settings(?)</Dropdown.Item>
          <Dropdown.Item>(?)Share a project(?)</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Menu.Item
        as="a"
        header
        style={{ flex: "auto", "justify-content": "flex-end" }}
        floated="right"
      >
        {/* <Image size="mini" src="/logo.png" style={{ marginRight: "1.5em" }} /> */}
        Loggr
      </Menu.Item>
      {/* <h3 style={{ float: "right" }}>DockIT</h3> */}
    </Container>
  </Menu>
);

export default NavBar;
