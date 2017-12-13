import React, { Component } from "react";
import SurveyForm from "./SurveyForm";
import SurveyFormReview from "./SurveyFormReview";
import { reduxForm } from "redux-form";

class SurveyNew extends Component {
  constructor(props) {
    super(props);
    this.showReview = this.showReview.bind(this);
    this.hideReview = this.hideReview.bind(this);
  }

  state = {
    showReview: false
  };

  showReview() {
    this.setState({ showReview: true });
  }

  hideReview() {
    this.setState({ showReview: false });
  }

  render() {
    const { showReview } = this.state;
    return (
      <div>
        {showReview ? (
          <SurveyFormReview onBack={this.hideReview} />
        ) : (
          <SurveyForm showReview={this.showReview} />
        )}
      </div>
    );
  }
}

export default reduxForm({ form: "surveyForm" })(SurveyNew);
