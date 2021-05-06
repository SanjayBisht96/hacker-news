import { useState } from "react";
import dynamic from "next/dynamic";
import {
  FormLabelInputGroup,
  FormLabelTextAreaGroup,
} from "components/sections/FormElements";
import SuccessContainer from "components/sections/SuccessContainer";
import { handleAskPosting } from "client-utils/functions/handling.functions";
import useAuth from "hooks/useAuth";
import usePrivateRoutes from "hooks/usePrivateRoutes";

const Navbar = dynamic(() => import("components/layouts/Navbar"));

const CreateLinkAsk = () => {
  usePrivateRoutes();

  const [askTitle, setAskTitle] = useState("");
  const [askText, setAskURL] = useState("");
  const [askTags, setAskTags] = useState("");
  const [formError, setFormError] = useState("");
  const [isSubmitClicked, setIsSubmitClicked] = useState(false);
  const [isAskPostPublished, setIsAskPostPublished] = useState(false);

  const onHandlingAskPosting = async (event) => {
    event.preventDefault();

    setIsSubmitClicked(true);
    setFormError("");

    // Form validation
    if (askTitle == "") {
      setFormError("Please input ask title");
      setIsSubmitClicked(false);
      return;
    } else if (askText == "") {
      setFormError("Please input ask URL");
      setIsSubmitClicked(false);
      return;
    }

    const userData = useAuth();

    const { id } = userData;

    const askPostingResponse = await handleAskPosting(
      id,
      askTitle,
      askTags,
      askText
    );

    if (askPostingResponse.status === "Failed") {
      setFormError(askPostingResponse.error);
      setIsSubmitClicked(false);
    } else {
      setIsAskPostPublished(true);
    }
  };

  return (
    <main className="posting">
      <Navbar />

      <section className="posting__container">
        {!isAskPostPublished ? (
          <div className="posting__container__content">
            <h3 className="heading-sub">Ask A Question</h3>
            <form className="form posting__container__content__form">
              <FormLabelInputGroup
                label="Ask Title *"
                inputType="text"
                handleInput={(event) => setAskTitle(event.target.value)}
              />
              <FormLabelInputGroup
                label="Ask URL *"
                inputType="text"
                handleInput={(event) => setAskURL(event.target.value)}
              />
              <FormLabelTextAreaGroup
                label="Ask Tags *"
                inputType="text"
                handleInput={(event) => setAskTags(event.target.value)}
              />
              <button
                className="btn btn-md form__submit"
                onClick={onHandlingAskPosting}
              >
                {!isSubmitClicked ? "Publish ask" : "Publishing..."}
              </button>
            </form>
            {formError && <p className="form__error">{formError}</p>}
          </div>
        ) : (
          <SuccessContainer
            heading="Your posting has been published"
            paragraph="You can start surfing through homepage"
          />
        )}
      </section>
    </main>
  );
};

export default CreateLinkAsk;
