import React, { useState } from "react";
import Navbar from "components/layouts/Navbar";
import {
  FormLabelInputGroup,
  FormLabelTextAreaGroup,
} from "components/sections/FormElements";
import { handleJobPosting } from "client-utils/functions/handling.functions";
import SuccessContainer from "components/sections/SuccessContainer";
import { useAuth, usePrivateRoutes } from "client-utils/hooks/auth";

const JobPosting = () => {
  usePrivateRoutes();

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

    // Form validation
    if (jobTitle == "") {
      setFormError("Please input job title");
      setIsSubmitClicked(false);
      return;
    } else if (jobDescription == "") {
      setFormError("Please input job description");
      setIsSubmitClicked(false);
      return;
    } else if (jobURL == "") {
      setFormError("Please input job URL");
      setIsSubmitClicked(false);
      return;
    }

    const userData = useAuth();

    const { id } = userData;

    const jobPostingResponse = await handleJobPosting(
      id,
      jobTitle,
      jobDescription,
      jobURL
    );

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
            <h3 className="heading-sub">Submit A Job Posting</h3>
            <form className="form posting__container__content__form">
              <FormLabelInputGroup
                label="Job Title *"
                inputType="text"
                handleInput={(event) => setJobTitle(event.target.value)}
              />
              <FormLabelTextAreaGroup
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
