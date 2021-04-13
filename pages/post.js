import React from "react";
import Navbar from "../components/layouts/Navbar";
import { FormLabelInputGroup } from "../components/sections/FormElements";

const PublishAPost = () => {
  return (
    <main className="posting">
      <Navbar />

      <section className="posting__container">
        <div className="posting__container__content">
          <h3 className="heading-sub--sub">Submit A Post</h3>
          <form className="form posting__container__content__form">
            <FormLabelInputGroup
              label="Post Title *"
              inputType="text"
              handleInput={(event) => console.log(event.target.value)}
            />
            <FormLabelInputGroup
              label="Post URL *"
              inputType="text"
              handleInput={(event) => console.log(event.target.value)}
            />
            <FormLabelInputGroup
              label="Post Tags"
              inputType="text"
              handleInput={(event) => console.log(event.target.value)}
            />
            <p className="paragraph--sub">
              *To add tags, start tags by ‘#’ and end with a single space.
            </p>
            <button className="btn btn-md form__submit posting__container__content__form__submit">
              Publish A Post
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default PublishAPost;
