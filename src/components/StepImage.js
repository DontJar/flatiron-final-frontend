import React from "react";
import { Image, Confirm } from "semantic-ui-react";
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

  selectThisImage = imagePos => {
    this.props.setSelectedImage(imagePos);
  };

  render() {
    const { imageOpen } = this.state;
    return (
      <div className="content">
        <div style={{ margin: "-1em" }}>
          <Image
            onClick={() => this.selectThisImage(this.props.imagePos)}
            src={
              this.props.image.smaller_url
                ? this.props.image.smaller_url
                : this.props.image.url
            }
            size="tiny"
            style={{
              borderRadius: "5px",
              objectFit: "cover",
              width: "75x",
              height: "75px"
            }}
          />
        </div>

        <Confirm
          open={imageOpen}
          content="Confirm image delete"
          cancelButton="cancel"
          onCancel={this.imageHandleCancel}
          confirmButton="DELETE"
          onConfirm={this.handleImageDelete}
        />
      </div>
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
