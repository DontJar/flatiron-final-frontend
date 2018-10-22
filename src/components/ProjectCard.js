import React from "react";
import { Card, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

import noImage from "../no-image.png";

const ProjectCard = props => {
  // debugger;
  return (
    <Card raised key={props.project.id} style={{ borderRadius: "15px" }}>
      <Link className="item" to={`/projects/${props.project.id}`}>
        <Card.Content>
          {props.project.images.find(image => image.is_cover) ? (
            <Image
              style={{ borderRadius: "5px" }}
              src={
                props.project.images.find(
                  image => image.id === props.project.cover_image_id
                ).url
              }
            />
          ) : (
            <Image src={noImage} />
          )}
          <br />

          <Card.Description style={{ textAlign: "center" }}>
            {props.project.title}
          </Card.Description>
          <br />
        </Card.Content>
      </Link>
    </Card>
  );
};

export default ProjectCard;
