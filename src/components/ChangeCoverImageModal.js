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
      current_cover: props.current_cover
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
    this.props.setImageToCover(e.target.id, this.state.current_cover.id);
    this.setState({
      current_cover: e.target.id
    });
  }

  render() {
    return (
      <Modal
        trigger={
          <Button attached="bottom" onClick={() => this.toggleModal()}>
            {this.props.current_cover
              ? "Change Cover Image"
              : "Select a Cover Image from your Current Project Images"}
          </Button>
        }
        open={this.state.modalOpen}
        content={
          <Segment inverted>
            {this.props.images.map(image => (
              <div class="ui raised card">
                <div class="content">
                  {image.url ? (
                    <img
                      src={image.url}
                      class="ui image"
                      onClick={e => {
                        this.handleClick(e);
                      }}
                      id={image.id}
                    />
                  ) : (
                    <img src={noImage} class="ui image" />
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
