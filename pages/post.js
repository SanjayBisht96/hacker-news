import React from "react";
import Navbar from "../components/layouts/Navbar";

const PublishAPost = () => {
  return (
    <main className="posting">
      <Navbar />

      <section className="posting__container">
        <div className="posting__container__content">
          <h3 className="heading-sub--sub">Submit A Post</h3>
          <form className="form posting__container__content__form">
            <div className="form__group posting__container__content__form__group">
              <label className="form__label">Post Title *</label>
              <input
                type="text"
                className="form__input posting__container__content__form__input"
              />
            </div>
            <div className="form__group posting__container__content__form__group">
              <label className="form__label">Post URL *</label>
              <input
                type="text"
                className="form__input posting__container__content__form__input"
              />
            </div>
            <div className="form__group posting__container__content__form__group">
              <label className="form__label">Post Tags</label>
              <input
                type="text"
                className="form__input posting__container__content__form__input"
              />
              <p className="paragraph--sub">*To add tags, start tags by ‘#’ and end with a single space.</p>
            </div>
            <button className="btn btn-md form__submit posting__container__content__form__submit">
              Send for approval
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default PublishAPost;
