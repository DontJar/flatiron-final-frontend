import React from "react";
import { connect } from "react-redux";
import {
  Image,
  Button,
  Container,
  Form,
  TextArea,
  Card,
  Confirm,
  Icon
} from "semantic-ui-react";
import { withRouter } from "react-router";

import { updateProject, deleteProject } from "../redux/actions";
import ChangeCoverImageModal from "./ChangeCoverImageModal";
import noImage from "../no-image.png";

class ProjectCover extends React.Component {
  constructor() {
    super();
    this.state = {
      editingDescription: false,
      open: false
    };
  }

  handleEditClick() {
    this.setState({
      editingDescription: !this.state.editingDescription,
      description: this.props.project.description
    });
  }

  handleDescriptionChange(e) {
    this.setState({
      description: e.target.value
    });
  }

  handleSaveClick() {
    this.setState({
      editingDescription: false
    });
    this.props.updateProject(this.state, this.props.project.id);
  }

  deleteWarning = () => {
    this.setState({
      open: true
    });
  };

  handleCancel = () => {
    this.setState({
      open: false
    });
  };

  handleConfirm = () => {
    this.setState({
      open: false
    });
    this.props.history.push("/index");
    this.props.deleteProject(this.props.project.id);
  };

  render() {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    };
    const { open } = this.state;
    // debugger;
    return (
      <div style={{ marginTop: "5em" }}>
        <Container fluid>
          <div className="ui fluid card">
            <div className="content">
              <h2>
                <strong>{this.props.project.title}</strong>
              </h2>
            </div>
            {this.props.project.cover_image_id &&
            this.props.project.images.find(
              image => image.id === this.props.project.cover_image_id
            ) !== undefined ? (
              <Image
                size="medium"
                centered
                src={
                  this.props.project.images.find(
                    image => image.id === this.props.project.cover_image_id
                  ).smaller_url
                    ? this.props.project.images.find(
                        image => image.id === this.props.project.cover_image_id
                      ).smaller_url
                    : this.props.project.images.find(
                        image => image.id === this.props.project.cover_image_id
                      ).url
                }
              />
            ) : (
              <Image src={noImage} size="medium" centered />
            )}

            <div className="content">
              <div className="header" href="#">
                Description:
              </div>
              {!this.state.editingDescription ? (
                <div>
                  <div>{this.props.project.description}</div>
                  <br />
                </div>
              ) : (
                <Form>
                  <TextArea
                    value={this.state.description}
                    onChange={e => this.handleDescriptionChange(e)}
                  />
                </Form>
              )}
              {!this.state.editingDescription ? (
                <div>
                  <Button
                    floated="right"
                    size="tiny"
                    onClick={this.deleteWarning}
                    color="red"
                  >
                    <Icon
                      name="trash alternate icon"
                      style={{ margin: "0em" }}
                    />
                    <Confirm
                      open={open}
                      content="Confirm that you would like to delete this entire project this step."
                      cancelButton="cancel"
                      confirmButton="DELETE"
                      onCancel={this.handleCancel}
                      onConfirm={this.handleConfirm}
                    />
                  </Button>
                  <Button
                    size="tiny"
                    floated="right"
                    onClick={() => this.handleEditClick()}
                  >
                    Edit
                  </Button>
                </div>
              ) : (
                <div>
                  <Button size="tiny" onClick={() => this.handleEditClick()}>
                    Cancel
                  </Button>
                  <Button
                    icon="save"
                    floated="right"
                    onClick={() => this.handleSaveClick()}
                  />
                </div>
              )}

              <div className="meta">
                <p>
                  Project started: <br />
                  {new Date(
                    Date.parse(this.props.project.created_at)
                  ).toLocaleDateString("en-US", options)}
                </p>
              </div>
            </div>
          </div>
          <Card.Group centered itemsPerRow={3} style={{ margin: "auto" }}>
            {this.props.project.images.length > 0 && (
              <ChangeCoverImageModal
                images={this.props.project.images}
                currentCover={this.props.project.cover_image_id}
                projectId={this.props.project.id}
              />
            )}
          </Card.Group>
        </Container>
        <br />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateProject: (projecDetails, projectId) =>
      dispatch(updateProject(projecDetails, projectId)),
    deleteProject: projectId => dispatch(deleteProject(projectId))
  };
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(ProjectCover)
);
