import React from "react";
import { Image, Button, Container } from "semantic-ui-react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import noImage from "../no-image.png";
import { deleteProject } from "../redux/actions";

const ProjectCover = props => {
  // debugger;

  const handleDeleteClick = () => {
    props.history.push("/");
    // debugger;
    props.deleteProject(props.project.id);
  };

  return (
    <Container fluid>
      <div>
        Title:
        <strong>{props.project.title}</strong>
      </div>
      <div>
        Begun: <strong>{props.project.start_date}</strong>
      </div>
      <div>
        Cover Picture
        {props.project.images.length > 1 ? (
          <Image src={props.project.images[0].url} />
        ) : (
          <Image src={noImage} />
        )}
      </div>
      <div>
        Description: <strong>{props.project.description}</strong>
      </div>
      <Button>Change Cover Image</Button>
      <Button floated="right">Add Step</Button>
      <br />
      <Button icon="delete" floated="right" onClick={handleDeleteClick} />
      <Button icon="save" floated="left" />
    </Container>
  );
};
//
// const mapDispatchToProps = dispatch => {
//   return {
//     deleteProject: deleteProject => dispatch(deleteProject(deleteProject))
//   };
// };

export default withRouter(
  connect(
    null,
    { deleteProject }
  )(ProjectCover)
);
