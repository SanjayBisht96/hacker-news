import { useState } from "react";
import dynamic from "next/dynamic";
import {
  FormLabelInputGroup,
  FormLabelTextAreaGroup,
} from "components/sections/FormElements";
import SuccessContainer from "components/sections/SuccessContainer";
import { handleLinkPosting } from "client-utils/functions/handling.functions";
import useAuth from "hooks/useAuth";
import usePrivateRoutes from "hooks/usePrivateRoutes";

const Navbar = dynamic(() => import("components/layouts/Navbar"));

const CreateLinkPost = () => {
  usePrivateRoutes();

  const [postTitle, setPostTitle] = useState("");
  const [postURL, setPostURL] = useState("");
  const [postTags, setPostTags] = useState("");
  const [formError, setFormError] = useState("");
  const [isSubmitClicked, setIsSubmitClicked] = useState(false);
  const [isPostPublished, setIsPostPublished] = useState(false);

  const onHandlingLinkPosting = async (event) => {
    event.preventDefault();

    setIsSubmitClicked(true);
    setFormError("");

    // Form validation
    if (postTitle == "") {
      setFormError("Please input post title");
      setIsSubmitClicked(false);
      return;
    } else if (postURL == "") {
      setFormError("Please input post URL");
      setIsSubmitClicked(false);
      return;
    }

    const userData = useAuth();

    const { id } = userData;

    const linkPostingResponse = await handleLinkPosting(
      id,
      postTitle,
      postTags,
      postURL
    );

    console.log(linkPostingResponse)

    if (linkPostingResponse.status === "Failed") {
      setFormError(linkPostingResponse.error);
      setIsSubmitClicked(false);
    } else {
      setIsPostPublished(true);
    }
  };

  return (
    <main className="posting">
      <Navbar />

      <section className="posting__container">
        {!isPostPublished ? (
          <div className="posting__container__content">
            <h3 className="heading-sub">Publish A Post</h3>
            <form className="form posting__container__content__form">
              <FormLabelInputGroup
                label="Post Title *"
                inputType="text"
                handleInput={(event) => setPostTitle(event.target.value)}
              />
              <FormLabelInputGroup
                label="Post URL *"
                inputType="text"
                handleInput={(event) => setPostURL(event.target.value)}
              />
              <FormLabelTextAreaGroup
                label="Post Tags *"
                inputType="text"
                handleInput={(event) => setPostTags(event.target.value)}
              />
              <button
                className="btn btn-md form__submit"
                onClick={onHandlingLinkPosting}
              >
                {!isSubmitClicked ? "Publish post" : "Publishing..."}
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

export default CreateLinkPost;
