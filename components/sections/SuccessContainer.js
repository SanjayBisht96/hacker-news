import React from "react";
import PropTypes from "prop-types";

const SuccessContainer = ({ heading, paragraph }) => {
  return (
    <div className="tasksuccess">
      <div className="tasksuccess__container">
        <img
          src="../../assets/images/success-icon.png"
          className="tasksuccess__container__image"
        />
        <h3 className="heading-sub tasksuccess__container__heading">
          {heading}
        </h3>
        <p className="paragraph-sub tasksuccess__container__paragraph">
          {paragraph}
        </p>
        <a href="/">
          <button className="btn btn-md tasksuccess__container__button">
            Back to home
          </button>
        </a>
      </div>
    </div>
  );
};

export default SuccessContainer;

SuccessContainer.propTypes = {
  heading: PropTypes.string,
  paragraph: PropTypes.string,
};
