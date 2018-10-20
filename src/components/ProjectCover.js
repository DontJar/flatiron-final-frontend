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
    this.state = { editingDescription: false, coverImage: null };
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
    // debugger;
    return (
      <div style={{ marginTop: "5em" }}>
        <Container fluid>
          {/* TODO: implement the code below
         <div>
          Begun: <strong>{this.props.project.start_date}</strong>
        </div> */}

          <div className="ui fluid card">
            <div className="content">
              <h2>
                <strong>{this.props.project.title}</strong>
              </h2>
            </div>
            {this.props.project.images.find(image => image.is_cover) ? (
              <Image
                size="medium"
                centered
                src={
                  this.props.project.images.find(image => image.is_cover).url
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
          {/*
          <div>
            <Segment>
              {this.props.project.images.find(image => image.is_cover) ? (
                <Image
                  size="medium"
                  centered
                  src={
                    this.props.project.images.find(image => image.is_cover).url
                  }
                />
              ) : (
                <Image src={noImage} />
              )}
            </Segment>
          </div> */}

          <Card.Group centered itemsPerRow={3} style={{ margin: "auto" }}>
            <ChangeCoverImageModal
              images={this.props.project.images}
              current_cover={
                this.props.project.images.find(image => image.is_cover)
                  ? this.props.project.images.find(image => image.is_cover)
                  : 0
              }
            />
          </Card.Group>
          {/*
          {!this.state.editingDescription ? (
            <div>
              <br />
              Description: <strong>{this.props.project.description}</strong>
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
            <Button size="tiny" onClick={() => this.handleEditClick()}>
              Edit Description
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
          )} */}
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
