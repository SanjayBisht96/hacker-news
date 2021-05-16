import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import dynamic from "next/dynamic";
import {
  FormLabelInputGroup,
  FormLabelTextAreaGroup,
} from "components/sections/FormElements";
import SuccessContainer from "components/sections/SuccessContainer";
import {
  getAskPostById,
  updateAskPostById,
} from "client-utils/functions/handling.functions";
import useAuth from "hooks/useAuth";
import usePrivateRoutes from "hooks/usePrivateRoutes";

const Navbar = dynamic(() => import("components/layouts/Navbar"));

const UpdateAskPost = ({ askPostId }) => {
  usePrivateRoutes();

  const [askTitle, setAskTitle] = useState("");
  const [askText, setAskText] = useState("");
  const [askTags, setAskTags] = useState("");
  const [formError, setFormError] = useState("");
  const [isSubmitClicked, setIsSubmitClicked] = useState(false);
  const [isPostPublished, setIsPostPublished] = useState(false);

  const fetchAskPostForUser = async () => {
    const { id } = useAuth();

    const fetchAskPostResponse = await getAskPostById({
      userId: id,
      askId: askPostId,
    });

    console.log(fetchAskPostResponse)

    const { title, text, tags } = fetchAskPostResponse;

    setAskTitle(title);
    setAskText(text);
    setAskTags(tags);
  };

  useEffect(() => {
    fetchAskPostForUser();
  }, []);

  const onHandlingAskPosting = async (event) => {
    event.preventDefault();

    setIsSubmitClicked(true);
    setFormError("");

    // Form validation
    if (askTitle == "") {
      setFormError("Please input post title");
      setIsSubmitClicked(false);
      return;
    } else if (askText == "") {
      setFormError("Please input post URL");
      setIsSubmitClicked(false);
      return;
    }

    const userData = useAuth();

    const { id } = userData;

    const payload = {
      userId: id,
      askPostId,
      askPostData: {
        title: askTitle,
        text: askText,
        tags: askTags,
      },
    };

    const updateAskPostingResponse = await updateAskPostById(payload);

    if (updateAskPostingResponse.status === "Failed") {
      setFormError(updateAskPostingResponse.error);
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
            <h3 className="heading-sub">Update Ask Post</h3>
            <form className="form posting__container__content__form">
              <FormLabelInputGroup
                label="Ask Title"
                inputType="text"
                value={askTitle}
                handleInput={(event) => setAskTitle(event.target.value)}
              />
              <FormLabelInputGroup
                label="Ask URL"
                inputType="text"
                value={askText}
                handleInput={(event) => setAskText(event.target.value)}
              />
              <FormLabelTextAreaGroup
                label="Ask Tags"
                inputType="text"
                value={askTags}
                handleInput={(event) => setAskTags(event.target.value)}
              />
              <button
                className="btn btn-md form__submit"
                onClick={onHandlingAskPosting}
              >
                {!isSubmitClicked ? "Edit post" : "Editing..."}
              </button>
            </form>
            {formError && <p className="form__error">{formError}</p>}
          </div>
        ) : (
          <SuccessContainer
            heading="Your posting has been edited"
            paragraph="You can start surfing through homepage"
          />
        )}
      </section>
    </main>
  );
};

export default UpdateAskPost;

export const getServerSideProps = (req) => {
  return {
    props: { askPostId: req.query.postId },
  };
};

UpdateAskPost.propTypes = {
  askPostId: PropTypes.string,
};
