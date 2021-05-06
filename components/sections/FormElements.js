import React from "react";

export const FormLabelInputGroup = (props) => {
  const { label, name, inputType, handleInput, placeholder, value } = props;

  return (
    <div className="form__group posting__container__content__form__group">
      { label && 
        <label className="form__label">{label}</label>
      }
      <input
        type={inputType}
        name={name}
        className="form__input posting__container__content__form__input"
        onChange={handleInput}
        placeholder={placeholder}
        value={value}
      />
    </div>
  );
};

export const FormLabelTextAreaGroup = (props) => {
  const { id, label, inputType, handleInput } = props;
  console.log(id);
  return (
    <div className="form__group posting__container__content__form__group">
      <label className="form__label">{label}</label>
      <textarea
        id={id}
        type={inputType}
        className="form__input posting__container__content__form__input"
        onChange={handleInput} rows="5"
      />
    </div>
  );
};

