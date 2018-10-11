import React from "react";
import { Card, Image } from "semantic-ui-react";

const ProjectCard = props => {
  return (
    <Card raised key={props.project.id}>
      <Card.Content>
        <Card.Description style={{ "text-align": "center" }}>
          {props.project.title}
        </Card.Description>
      </Card.Content>
      <Image src={props.project.images[0].url} />
    </Card>
  );
};

export default ProjectCard;
