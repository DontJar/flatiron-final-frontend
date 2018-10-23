import React from "react";
import { Dropdown, Image, Icon, Menu, Container } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

import NewProject from "../components/NewProject";
import loggrLogo from "../log.svg";

const NavBar = () => (
  <Menu fixed="top">
    <Container>
      <Dropdown item icon="bars" simple>
        <Dropdown.Menu>
          <Dropdown.Item>
            <NewProject />
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Menu.Menu position="right" style={{ margin: ".5em" }} header>
        Loggr
        <NavLink to="/index">
          <Image src={loggrLogo} style={{ height: "2em" }} />
        </NavLink>
      </Menu.Menu>
      {/* </div> */}
    </Container>
  </Menu>
);

export default NavBar;
