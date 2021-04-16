import React from "react";

export const FormLabelInputGroup = (props) => {
  const { label, inputType, handleInput } = props;

  return (
    <div className="form__group posting__container__content__form__group">
      <label className="form__label">{label}</label>
      <input
        type={inputType}
        className="form__input posting__container__content__form__input"
        onChange={handleInput}
      />
    </div>
  );
};

export const FormLabelTextAreaGroup = (props) => {
  const { label, inputType, handleInput } = props;

  return (
    <div className="form__group posting__container__content__form__group">
      <label className="form__label">{label}</label>
      <textarea
        type={inputType}
        className="form__input posting__container__content__form__input"
        onChange={handleInput} rows="5"
      />
    </div>
  );
};

