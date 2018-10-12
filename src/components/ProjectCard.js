import React from "react";
import { Card, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

import noImage from "../no-image.png";

const ProjectCard = props => {
  return (
    <Card raised key={props.project.id}>
      <Link className="item" to={`/projects/${props.project.id}`}>
        <Card.Content>
          <Card.Description style={{ "text-align": "center" }}>
            {props.project.title}
          </Card.Description>
        </Card.Content>
        {props.project.images.length > 1 ? (
          <Image src={props.project.images[0].url} />
        ) : (
          <Image src={noImage} />
        )}
      </Link>
    </Card>
  );
};

export default ProjectCard;
