import React from "react";
import { Card, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

import noImage from "../no-image.png";

const ProjectCard = props => {
  // debugger;
  return (
    <Card raised key={props.project.id}>
      <Link className="item" to={`/projects/${props.project.id}`}>
        <Card.Content>
          {props.project.steps.length > 0 ? (
            <Image src={props.project.steps[0].images[0].url} />
          ) : (
            <Image src={noImage} />
          )}
          <Card.Description style={{ textAlign: "center" }}>
            {props.project.title}
          </Card.Description>
        </Card.Content>
      </Link>
    </Card>
  );
};

export default ProjectCard;
