import React from "react";
import Navbar from "../components/layouts/Navbar";

const JobPosting = () => {
  return (
    <main className="posting">
      <Navbar />

      <section className="posting__container">
        <div className="posting__container__content">
          <h3 className="heading-sub--sub">Submit A Job Posting</h3>
          <form className="form posting__container__content__form">
            <div className="form__group posting__container__content__form__group">
              <label className="form__label">Job Title *</label>
              <input
                type="text"
                className="form__input posting__container__content__form__input"
              />
            </div>
            <div className="form__group posting__container__content__form__group">
              <label className="form__label">Job Description *</label>
              <input
                type="text"
                className="form__input posting__container__content__form__input"
              />
            </div>
            <div className="form__group posting__container__content__form__group">
              <label className="form__label">Job URL *</label>
              <input
                type="text"
                className="form__input posting__container__content__form__input"
              />
            </div>
            <button className="btn btn-md form__submit">Send for approval</button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default JobPosting;
