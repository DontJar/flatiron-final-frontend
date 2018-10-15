import React from "react";
import { Image, Button } from "semantic-ui-react";

import noImage from "../no-image.png";

const ProjectStep = props => {
  // debugger;
  return (
    <div>
      {props.thisStep.images.length > 0 ? (
        <Image src={props.thisStep.images[0].url} />
      ) : (
        <Image centered size="tiny" src={noImage} />
      )}
      <div>In this step: {props.thisStep.description}</div>
      <Button>Remove Step</Button>
    </div>
  );
};

export default ProjectStep;
