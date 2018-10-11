import React from "react";

import { Image, Button, Container } from "semantic-ui-react";

const ProjectCover = props => {
  // debugger;
  return (
    <Container fluid>
      <div>
        Title:
        <strong>{props.project.title}</strong>
      </div>
      <div>
        Begun: <strong>{props.project.start_date}</strong>
      </div>
      <div>
        Cover Picture
        <Image src={props.project.images[0].url} />
      </div>
      <div>
        Description: <strong>{props.project.description}</strong>
      </div>
      <Button>Change Cover Image</Button>
      <Button>Add Step</Button>
      <Button icon="save" />
    </Container>
  );
};

export default ProjectCover;
