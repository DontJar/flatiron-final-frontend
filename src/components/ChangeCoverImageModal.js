import React from "react";
import { Modal, Button, Segment } from "semantic-ui-react";
import { withRouter } from "react-router";
import { connect } from "react-redux";

import { setImageToCover } from "../redux/actions";

import noImage from "../no-image.png";

class ChangeCoverImageModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalOpen: false,
      currentCover: props.currentCover
    };
  }

  toggleModal() {
    this.setState({
      modalOpen: !this.state.modalOpen
    });
  }

  handleClick(e) {
    this.setState({
      modalOpen: !this.state.modalOpen
    });
    this.props.setImageToCover(e.target.id, this.props.projectId);
  }

  render() {
    return (
      <Modal
        trigger={
          <Button attached="bottom" onClick={() => this.toggleModal()}>
            {this.props.currentCover
              ? "Change Cover Image"
              : "Select a Cover Image from your Current Project Images"}
          </Button>
        }
        open={this.state.modalOpen}
        content={
          <Segment inverted>
            {this.props.images.map(image => (
              <div
                key={image.id}
                className="ui raised card"
                style={{ marginLeft: "auto", marginRight: "auto" }}
              >
                <div className="content">
                  {image.url ? (
                    <img
                      alt=""
                      src={image.smaller_url ? image.smaller_url : image.url}
                      className="ui image"
                      onClick={e => {
                        this.handleClick(e);
                      }}
                      id={image.id}
                    />
                  ) : (
                    <img src={noImage} className="ui image" alt="" />
                  )}
                </div>
              </div>
            ))}
            <Button attached="bottom" onClick={() => this.toggleModal()}>
              Cancel
            </Button>
          </Segment>
        }
      />
    );
  }
}

// const mapDispatchToProps = dispatch => {
//   return {
//     setImageToCover: imageId => dispatch(setImageToCover(imageId))
//   };
// };

export default withRouter(
  connect(
    null,
    { setImageToCover }
  )(ChangeCoverImageModal)
);
