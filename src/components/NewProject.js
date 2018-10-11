import React from "react";
import { Image, Input } from "semantic-ui-react";

import plusPNG from "../plus.png";

const NewProject = () => {
  return (
    <div>
      <h2 style={{ display: "flex", "justify-content": "center" }}>
        Start a new project
      </h2>
      <div>
        <Image
          size="tiny"
          style={{ position: "absolute", "margin-top": "12em", left: "33.25%" }}
          src={plusPNG}
        />
        <Input
          fluid
          style={{ "margin-top": "5em" }}
          placeholder="Project name..."
        />
      </div>
    </div>
  );
};

export default NewProject;
