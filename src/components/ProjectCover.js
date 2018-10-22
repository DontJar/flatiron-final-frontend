import React from "react";
import { connect } from "react-redux";
import {
  Image,
  Button,
  Container,
  Form,
  TextArea,
  Card
} from "semantic-ui-react";

import { updateProject } from "../redux/actions";
import ChangeCoverImageModal from "./ChangeCoverImageModal";
import noImage from "../no-image.png";

class ProjectCover extends React.Component {
  constructor() {
    super();
    this.state = {
      editingDescription: false
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

  render() {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    };

    return (
      <div style={{ marginTop: "5em" }}>
        <Container fluid>
          <div className="ui fluid card">
            <div className="content">
              <h2>
                <strong>{this.props.project.title}</strong>
              </h2>
            </div>
            {this.props.project.cover_image_id ? (
              <Image
                size="medium"
                centered
                src={
                  this.props.project.images.find(
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
                <Button
                  size="tiny"
                  floated="right"
                  onClick={() => this.handleEditClick()}
                >
                  Edit description
                </Button>
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
            <ChangeCoverImageModal
              images={this.props.project.images}
              currentCover={this.props.project.cover_image_id}
              projectId={this.props.project.id}
            />
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
      dispatch(updateProject(projecDetails, projectId))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(ProjectCover);
