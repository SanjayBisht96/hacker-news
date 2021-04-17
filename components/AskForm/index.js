import PropTypes from 'prop-types';
import { FormLabelInputGroup } from "../../components/sections/FormElements";

export default function AskForm({handleChange,handleSubmit}) {
    return(
    <>
      <section className="posting__container">
        <div className="posting__container__content">
          <h3 className="heading-sub--sub">Submit Ask Post</h3>
          <form className="form posting__container__content__form">
            <FormLabelInputGroup
              label="Ask Post Title *"
              name={"name"}
              inputType="text"
              handleInput={handleChange}
            />
            <FormLabelInputGroup
              label="Ask Post URL *"
              name={"text"}
              inputType="text"
              handleInput={handleChange}
            />
            <FormLabelInputGroup
              label="Ask Post Tags"
              name={"tags"}              
              inputType="text"
              handleInput={handleChange}
            />
            <p className="paragraph--sub">
              *To add tags, start tags by ‘#’ and end with a single space.
            </p>
            <button className="btn btn-md form__submit posting__container__content__form__submit" onClick={handleSubmit}>
              Publish Ask Post
            </button>
          </form>
        </div>
      </section>

    </>
    );
}

AskForm.propTypes = {
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
  };