import React, { useState } from "react";
import Navbar from "../components/layouts/Navbar";
import { FormLabelInputGroup } from "../components/sections/FormElements";
import { handleJobPosting } from "../client-utils/functions/handling.functions";
import SuccessContainer from "../components/sections/SuccessContainer";
// import SuccessIcon from '../assets/images/success-icon.png';

const JobPosting = () => {
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobURL, setJobURL] = useState("");
  const [formError, setFormError] = useState("");
  const [isSubmitClicked, setIsSubmitClicked] = useState(false);
  const [isJobSendForApproval, setIsJobSendForApproval] = useState(false);

  const onHandlingJobPosting = async (event) => {
    event.preventDefault();

    setIsSubmitClicked(true);
    setFormError("");

    const jobPostingResponse = await handleJobPosting(
      event,
      jobTitle,
      jobDescription,
      jobURL
    );
    console.log(jobPostingResponse);

    if (jobPostingResponse.status === "Failed") {
      setFormError(jobPostingResponse.error);
      setIsSubmitClicked(false);
    } else {
      setIsJobSendForApproval(true);
    }
  };

  return (
    <main className="posting">
      <Navbar />

      <section className="posting__container">
        {!isJobSendForApproval ? (
          <div className="posting__container__content">
            <h3 className="heading-sub--sub">Submit A Job Posting</h3>
            <form className="form posting__container__content__form">
              <FormLabelInputGroup
                label="Job Title *"
                inputType="text"
                handleInput={(event) => setJobTitle(event.target.value)}
              />
              <FormLabelInputGroup
                label="Job Description *"
                inputType="text"
                handleInput={(event) => setJobDescription(event.target.value)}
              />
              <FormLabelInputGroup
                label="Job URL *"
                inputType="text"
                handleInput={(event) => setJobURL(event.target.value)}
              />
              <button
                className="btn btn-md form__submit"
                onClick={onHandlingJobPosting}
              >
                {!isSubmitClicked ? "Send for approval" : "Sending..."}
              </button>
            </form>
            {formError && <p className="form__error">{formError}</p>}
          </div>
        ) : (
          <SuccessContainer
            heading="Your job posting has been sent for review."
            paragraph="It hardly takes 2 days to get accepted. We’ll mail you when published."
          />
        )}
      </section>
    </main>
  );
};

export default JobPosting;
