import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { Link } from "react-router-dom";
import SurveyField from "./SurveyField";
import { filterValidEmails } from "../../utils/validateEmails";
import formFields from "./formFields";

class SurveyForm extends Component {
  renderFields() {
    return formFields.map(({ name, label }) => (
      <Field
        key={name}
        label={label}
        type="text"
        name={name}
        component={SurveyField}
      />
    ));
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.showReview)}>
          {this.renderFields()}
          <Link to="/surveys" className="red btn-flat white-text">
            <i className="material-icons left">backspace</i> Cancel
          </Link>
          <button type="submit" className="teal btn-flat right white-text">
            Next <i className="material-icons right">navigate_next</i>
          </button>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};
  formFields.forEach(({ label, name }) => {
    if (!values[name]) errors[name] = `${label} needs to be provided!`;
  });

  const emails = values.recipientString;
  if (emails) {
    const invalidEmails = filterValidEmails(emails);
    if (invalidEmails.length)
      errors.recipientString = `These emails are invalid: ${invalidEmails}`;
  }
  return errors;
}

export default reduxForm({
  form: "surveyForm",
  destroyOnUnmount: false,
  validate
})(SurveyForm);
