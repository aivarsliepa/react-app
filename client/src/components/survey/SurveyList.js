import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import Survey from "./Survey";

class SurveyList extends Component {
  componentDidMount() {
    this.props.fetchSurveys();
  }

  renderSurveys() {
    return this.props.surveys.reverse().map(survey => {
      return (
        <div key={survey._id}>
          <Survey survey={survey} />
        </div>
      );
    });
  }
  render() {
    return <div>{this.renderSurveys()}</div>;
  }
}

const mapStateToProps = ({ surveys }) => {
  return { surveys };
};

export default connect(mapStateToProps, actions)(SurveyList);
