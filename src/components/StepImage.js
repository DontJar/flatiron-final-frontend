import React from "react";
import { Image, Confirm, Card } from "semantic-ui-react";
import { connect } from "react-redux";

import { deleteImage } from "../redux/actions";

class StepImage extends React.Component {
  state = {
    imageOpen: false
  };

  imageDelete = () => {
    this.setState({
      imageOpen: true
    });
  };

  handleImageDelete = () => {
    this.setState({
      open: false
    });
    this.props.deleteImage(this.props.image.id);
  };

  imageHandleCancel = () => {
    console.log("clicked");
    this.setState({
      imageOpen: false
    });
  };

  render() {
    // debugger;
    const { imageOpen } = this.state;
    return (
      <Card.Content>
        <a href={this.props.image.url}>
          <div>
            <Image
              src={
                this.props.image.smaller_url
                  ? this.props.image.smaller_url
                  : this.props.image.url
              }
              size="tiny"
              style={{
                borderRadius: "5px",
                objectFit: "cover",
                width: "100px",
                height: "100px"
              }}
            />
          </div>
        </a>

        <Confirm
          open={imageOpen}
          content="Confirm image delete"
          cancelButton="cancel"
          onCancel={this.imageHandleCancel}
          confirmButton="DELETE"
          onConfirm={this.handleImageDelete}
        />
      </Card.Content>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return { deleteImage: imageId => dispatch(deleteImage(imageId)) };
};

export default connect(
  null,
  mapDispatchToProps
)(StepImage);
