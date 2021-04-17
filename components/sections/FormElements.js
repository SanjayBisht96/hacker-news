import React from "react";

export const FormLabelInputGroup = (props) => {
  const { label, name, inputType, handleInput } = props;

  return (
    <div className="form__group posting__container__content__form__group">
      <label className="form__label">{label}</label>
      <input
        type={inputType}
        name={name}
        className="form__input posting__container__content__form__input"
        onChange={handleInput}
      />
    </div>
  );
};
