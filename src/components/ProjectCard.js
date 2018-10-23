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
          {props.project.cover_image_id ? (
            <Image
              style={{
                borderRadius: "5px",
                objectFit: "cover",
                width: "275px",
                height: "275px"
              }}
              src={
                props.project.images.find(
                  image => image.id === props.project.cover_image_id
                ).url
              }
            />
          ) : (
            <Image src={noImage} style={{ marginTop: "5em" }} />
          )}
          <br />

          <div
            className="content"
            style={{ textAlign: "center", textAlign: "center" }}
          >
            <div
              className="ui center aligned header"
              style={{ marginTop: ".25em" }}
            >
              {props.project.title}
            </div>
          </div>
          <br />
        </Card.Content>
      </Link>
    </Card>
  );
};

export default ProjectCard;
