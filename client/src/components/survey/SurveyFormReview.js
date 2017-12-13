import React from "react";
import { connect } from "react-redux";
import formFields from "./formFields";
import { withRouter } from "react-router";
import * as actions from "../../actions";

const SurveyFormReview = ({ onBack, formValues, submitSurvey, history }) => {
  function renderContent() {
    return formFields.map(({ label, name }) => {
      return (
        <div key={name}>
          <label>{label}</label>
          <div>{formValues[name]}</div>
        </div>
      );
    });
  }

  return (
    <div>
      <h5>Please review your survey</h5>
      <div>{renderContent()}</div>
      <button onClick={onBack} className="yellow btn-flat white-text darken-3">
        <i className="material-icons left">backspace</i> Back
      </button>
      <button
        className="green btn-flat white-text right"
        onClick={() => submitSurvey(formValues, history)}
      >
        Send Survey<i className="material-icons right">email</i>
      </button>
    </div>
  );
};

function mapStateToProps({ form }) {
  return { formValues: form.surveyForm.values };
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));
