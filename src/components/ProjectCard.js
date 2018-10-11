import React from "react";
import { Card, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

const ProjectCard = props => {
  return (
    <Card raised key={props.project.id}>
      <Link className="item" to={`/projects/${props.project.id}`}>
        <Card.Content>
          <Card.Description style={{ "text-align": "center" }}>
            {props.project.title}
          </Card.Description>
        </Card.Content>
        <Image src={props.project.images[0].url} />
      </Link>
    </Card>
  );
};

export default ProjectCard;
