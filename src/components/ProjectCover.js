import React from "react";
import { connect } from "react-redux";
import {
  Image,
  Button,
  Container,
  Segment,
  Form,
  TextArea
} from "semantic-ui-react";

import { updateProject } from "../redux/actions";
import noImage from "../no-image.png";

class ProjectCover extends React.Component {
  constructor() {
    super();
    this.state = { editingDescription: false };
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
    return (
      <Container fluid>
        <div>
          Title:
          <strong>{this.props.project.title}</strong>
        </div>
        {/* TODO: implement the code below
         <div>
          Begun: <strong>{this.props.project.start_date}</strong>
        </div> */}
        <div>
          <Segment>
            {this.props.project.steps > 0 ? (
              <Image
                size="medium"
                centered
                src={this.props.project.steps[0].images[0].url}
              />
            ) : (
              <Image src={noImage} />
            )}
          </Segment>
        </div>
        <Button>Change Cover Image</Button>
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
          <Button onClick={() => this.handleEditClick()}>
            Change Project Description
          </Button>
        ) : (
          <div>
            <Button onClick={() => this.handleEditClick()}>Cancel</Button>
            <Button
              icon="save"
              floated="right"
              onClick={() => this.handleSaveClick()}
            />
          </div>
        )}
      </Container>
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
