import React from "react";
import { Card, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

import noImage from "../Images/no-image.png";

const ProjectCard = props => {
  return (
    <Card key={props.project.id}>
      <Link className="item" to={`/projects/${props.project.id}`}>
        <Card.Content>
          {props.project.cover_image_id &&
          props.project.images.find(
            image => image.id === props.project.cover_image_id
          ) !== undefined ? (
            <Image
              style={{
                borderRadius: "4px",
                objectFit: "cover",
                width: "200px",
                height: "200px"
              }}
              src={
                props.project.images.find(
                  image => image.id === props.project.cover_image_id
                ).smaller_url
                  ? props.project.images.find(
                      image => image.id === props.project.cover_image_id
                    ).smaller_url
                  : props.project.images.find(
                      image => image.id === props.project.cover_image_id
                    ).url
              }
            />
          ) : (
            <Image
              src={noImage}
              style={{
                width: "200px",
                height: "200px"
              }}
            />
          )}
          <br />

          <div className="content" style={{ textAlign: "center" }}>
            <div
              className="ui center aligned header"
              style={{ marginTop: ".25em", marginBottom: "-1em" }}
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
