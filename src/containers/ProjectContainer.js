import React from "react";
import { connect } from "react-redux";
import { Segment, Dimmer, Loader } from "semantic-ui-react";
import { withRouter } from "react-router";

import ProjectCover from "../components/ProjectCover";
import ProjectStep from "../components/ProjectStep";
import NewStepModalForm from "../modals/NewStepModalForm";

class ProjectContainer extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div>
        {!this.props.project ? (
          <Segment>
            <Dimmer active inverted>
              <Loader style={{ marginTop: "12em" }} inverted>
                Loading
              </Loader>
            </Dimmer>
          </Segment>
        ) : (
          <div>
            <div style={{ marginBottom: "3em" }}>
              <ProjectCover project={this.props.project} />
              {this.props.project &&
                this.props.project.steps &&
                this.props.project.steps.map(step => (
                  <div key={step.id}>
                    <ProjectStep
                      thisStep={step}
                      stepNumber={this.props.project.steps.indexOf(step) + 1}
                    />
                    <div className="ui divider" style={{ marginTop: "2em" }} />
                  </div>
                ))}
              <br />
              <NewStepModalForm />
              <br />
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, propsFromParent) => {
  return {
    project: propsFromParent.project
  };
};

export default withRouter(connect(mapStateToProps)(ProjectContainer));
