import React from "react";

const Survey = ({ survey }) => {
  return (
    <div className="card blue-grey darken-1">
      <div className="card-content white-text">
        <span className="card-title">{survey.title}</span>
        <p>{survey.body}</p>
        <p className="right">
          Sent On: {new Date(survey.dateSent).toLocaleDateString()}
        </p>
      </div>
      <div className="card-action">
        <a>Yes: {survey.yes}</a>
        <a>No: {survey.no}</a>{" "}
        {survey.lastResponded && (
          <a>
            Last respond: {new Date(survey.lastResponded).toLocaleDateString()}
          </a>
        )}
      </div>
    </div>
  );
};

export default Survey;
