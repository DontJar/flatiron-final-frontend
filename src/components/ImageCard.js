import React from "react";
import { Card, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

import noImage from "../Images/no-image.png";

const ImageCard = props => {
  // debugger;
  return (
    <Card raised key={props.image.id} className="Image">
      <Card.Content>
        {props.image.url ? (
          <Image
            src={
              props.image._smaller_url
                ? props.image.smaller_url
                : props.image.url
            }
          />
        ) : (
          <Image src={noImage} />
        )}
      </Card.Content>
    </Card>
  );
};

export default ImageCard;
