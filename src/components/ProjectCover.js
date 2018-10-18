import React from "react";
import { connect } from "react-redux";
import {
  Image,
  Button,
  Container,
  Segment,
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

  // componentDidMount(
  //   let coverImage
  //   this.props.project.images.
  // ---> this.props.project.images.find((image) => {image.is_cover})
  // )

  render() {
    return (
      <div style={{ marginTop: "5em" }}>
        <Container fluid>
          <div>
            <h2>
              <strong>{this.props.project.title}</strong>
            </h2>
          </div>
          {/* TODO: implement the code below
         <div>
          Begun: <strong>{this.props.project.start_date}</strong>
        </div> */}
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
          </div>

          {!this.props.project.images.find(image => image.is_cover) && (
            <Card.Group centered itemsPerRow={3} style={{ margin: "auto" }}>
              <ChangeCoverImageModal images={this.props.project.images} />
            </Card.Group>
          )}
          {!this.state.editingDescription ? (
            <div>
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
          )}
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
