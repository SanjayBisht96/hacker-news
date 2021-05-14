import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import dynamic from "next/dynamic";
import {
  FormLabelInputGroup,
  FormLabelTextAreaGroup,
} from "components/sections/FormElements";
import SuccessContainer from "components/sections/SuccessContainer";
import {
  getLinkPostById,
  updateLinkPostById,
} from "client-utils/functions/handling.functions";
import useAuth from "hooks/useAuth";
import usePrivateRoutes from "hooks/usePrivateRoutes";

const Navbar = dynamic(() => import("components/layouts/Navbar"));

const UpdateLinkPost = ({ linkPostId }) => {
  usePrivateRoutes();

  const [postTitle, setPostTitle] = useState("");
  const [postURL, setPostURL] = useState("");
  const [postTags, setPostTags] = useState("");
  const [formError, setFormError] = useState("");
  const [isSubmitClicked, setIsSubmitClicked] = useState(false);
  const [isPostPublished, setIsPostPublished] = useState(false);

  const handleUpdateLinkPostForUser = async () => {
    const { id } = useAuth();

    const updateLinkPostsResponse = await getLinkPostById({
      userId: id,
      linkPostId,
    });

    const { title, url, tags } = updateLinkPostsResponse;

    setPostTitle(title);
    setPostURL(url);
    setPostTags(tags);
  };

  useEffect(() => {
    handleUpdateLinkPostForUser();
  }, []);

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

    const payload = {
      userId: id,
      linkPostId,
      linkPostData: {
        title: postTitle,
        url: postURL,
        tags: postTags,
      },
    };

    const updateLinkPostingResponse = await updateLinkPostById(payload);

    if (updateLinkPostingResponse.status === "Failed") {
      setFormError(updateLinkPostingResponse.error);
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
            <h3 className="heading-sub">Update A Post</h3>
            <form className="form posting__container__content__form">
              <FormLabelInputGroup
                label="Post Title"
                inputType="text"
                value={postTitle}
                handleInput={(event) => setPostTitle(event.target.value)}
              />
              <FormLabelInputGroup
                label="Post URL"
                inputType="text"
                value={postURL}
                handleInput={(event) => setPostURL(event.target.value)}
              />
              <FormLabelTextAreaGroup
                label="Post Tags"
                inputType="text"
                value={postTags}
                handleInput={(event) => setPostTags(event.target.value)}
              />
              <button
                className="btn btn-md form__submit"
                onClick={onHandlingLinkPosting}
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

export default UpdateLinkPost;

export const getServerSideProps = (req) => {
  return {
    props: { linkPostId: req.query.postId },
  };
};

UpdateLinkPost.propTypes = {
  linkPostId: PropTypes.string,
};
