import useVote from "hooks/useVote";
import PropTypes from "prop-types";
import { POST } from "const";

export const PostCard = ({
  postId,
  postTitle,
  postedBy,
  postedDate,
  postComments,
}) => {
  const { vote, downVote, upVote } = useVote(POST, postId);

  return (
    <div className="homepage__container__content__main__posts__item">
      <div className="homepage__container__content__main__posts__item__action">
        <h3 className="heading-main">{vote}</h3>
        <div className="homepage__container__content__main__posts__item__action__container">
          <button
            className="btn btn-sm homepage__container__content__main__posts__item__action__container__button"
            onClick={upVote}
          >
            <svg
              width="44"
              height="23"
              viewBox="0 0 44 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M41 22H3L22 2L41 22Z" stroke="black" strokeWidth="2" />
            </svg>
          </button>
          <button
            className="btn btn-sm homepage__container__content__main__posts__item__action__container__button"
            onClick={downVote}
          >
            <svg
              width="44"
              height="23"
              viewBox="0 0 44 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M3 1L41 1L21 21L3 1Z" stroke="#252323" strokeWidth="2" />
            </svg>
          </button>
        </div>
      </div>

      <div className="homepage__container__content__main__posts__item__content">
        <a href={`/discussion/${postId}`}>
          <h2 className="heading-sub homepage__container__content__main__posts__item__content__heading">
            {postTitle}
          </h2>
        </a>
        <div className="homepage__container__content__main__posts__item__content__footer">
          <p className="paragraph--sub homepage__container__content__main__posts__item__content__footer__paragraph">
            Posted by {postedBy}
          </p>
          <p className="paragraph--sub homepage__container__content__main__posts__item__content__footer__paragraph">
            Posted on {postedDate}
          </p>
          <p className="paragraph--sub homepage__container__content__main__posts__item__content__footer__paragraph">
            {postComments} Comments
          </p>
          <p className="paragraph--sub homepage__container__content__main__posts__item__content__footer__paragraph">
            <a href={"discussion/" + postId}>Discuss</a>
          </p>
        </div>
      </div>
    </div>
  );
};

PostCard.propTypes = {
  postList: PropTypes.array,
  postId: PropTypes.string,
  postTitle: PropTypes.string,
  postedBy: PropTypes.string,
  postedDate: PropTypes.string,
  postComments: PropTypes.string,
  postUpvotes: PropTypes.string,
};

export const AdminDashboardActionCard = ({
  heading,
  paragraph,
  ctaText,
  link,
}) => {
  return (
    <div className="admindashboard__container__content__actions__cards__item">
      <h3 className="heading-sub admindashboard__container__content__actions__cards__item__heading">
        {heading}
      </h3>
      <p className="paragraph-sub admindashboard__container__content__actions__cards__item__paragraph">
        {paragraph}
      </p>
      <a href={link}>
        <button className="btn btn-md admindashboard__container__content__actions__cards__item__button">
          {ctaText}
        </button>
      </a>
    </div>
  );
};

AdminDashboardActionCard.propTypes = {
  heading: PropTypes.string,
  paragraph: PropTypes.string,
  ctaText: PropTypes.string,
  link: PropTypes.string,
};

export const UserDashboardActionCard = ({
  heading,
  paragraph,
  ctaText,
  link,
}) => {
  return (
    <div className="admindashboard__container__content__actions__cards__item">
      <h3 className="heading-sub admindashboard__container__content__actions__cards__item__heading">
        {heading}
      </h3>
      <p className="paragraph-sub admindashboard__container__content__actions__cards__item__paragraph">
        {paragraph}
      </p>
      <a href={link}>
        <button className="btn btn-md admindashboard__container__content__actions__cards__item__button">
          {ctaText}
        </button>
      </a>
    </div>
  );
};

UserDashboardActionCard.propTypes = {
  heading: PropTypes.string,
  paragraph: PropTypes.string,
  ctaText: PropTypes.string,
  link: PropTypes.string,
};

export const ManageLinkPostCard = ({
  postId,
  postTitle,
  postUrl,
  postTags,
  postedBy,
  postedAt,
}) => {
  return (
    <div className="adminmanageposts__container__content__actions__cards__item">
      <a
        href={`/post/${postId}`}
        className="adminmanageposts__container__content__actions__cards__item__link"
      >
        <h3 className="heading-sub adminmanageposts__container__content__actions__cards__item__heading">
          {postTitle}
        </h3>
      </a>
      <p className="paragraph-sub adminmanageposts__container__content__actions__cards__item__paragraph">
        Posted by {postedBy} on {postedAt}
      </p>
      <div className="adminmanageposts__container__content__actions__cards__item__main">
        <p className="paragraph-sub adminmanageposts__container__content__actions__cards__item__paragraph">
          {postTags}
        </p>
        <a href={postUrl} target="_black">
          <button className="btn btn-sm adminmanageposts__container__content__actions__cards__item__button">
            Link
          </button>
        </a>
      </div>
      <div className="adminmanageposts__container__content__actions__cards__item__action">
        <a href={`/post/edit/${postId}`}>
          <button className="btn btn-md adminmanageposts__container__content__actions__cards__item__action__button__primary">
            Edit
          </button>
        </a>
        <button
          className="btn btn-md adminmanageposts__container__content__actions__cards__item__action__button"
          onClick={() => console.log(postId)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

ManageLinkPostCard.propTypes = {
  postId: PropTypes.string,
  postTitle: PropTypes.string,
  postUrl: PropTypes.string,
  postTags: PropTypes.string,
  postedBy: PropTypes.string,
  postedAt: PropTypes.string,
};

export const LinkPostCardsContainer = ({ allLinkPosts }) => {
  return (
    <div className="homepage__container__content__main__posts">
      {Array.isArray(allLinkPosts) && allLinkPosts.length > 0 ? (
        allLinkPosts.map((postData) => {
          const { postId, postedBy, postTitle, postedAt, noOfComments } = postData;

          return (
            <PostCard
              key={postId}
              postId={postId}
              postTitle={postTitle}
              postedBy={postedBy}
              postedDate={postedAt}
              postComments={noOfComments}
            />
          );
        })
      ) : (
        <h1>No posts available</h1>
      )}
    </div>
  );
};

LinkPostCardsContainer.propTypes = {
  allLinkPosts: PropTypes.array,
};

export const ManageLinkPostCardsContainer = ({ allLinkPosts }) => {
  return (
    <div className="adminmanageposts__container__content__actions__cards">
      {allLinkPosts.length > 0 ? (
        allLinkPosts.map((linkPost, key) => {
          const { postId, postTitle, postUrl, postTags, postedBy, postedAt } =
            linkPost;

          return (
            <ManageLinkPostCard
              key={key}
              postId={postId}
              postTitle={postTitle}
              postUrl={postUrl}
              postTags={postTags}
              postedBy={postedBy}
              postedAt={postedAt}
            />
          );
        })
      ) : (
        <h1>No posts found</h1>
      )}
    </div>
  );
};

ManageLinkPostCardsContainer.propTypes = {
  allLinkPosts: PropTypes.array,
};

export const ManageAskPostCardsContainer = ({ allAskPosts }) => {
  return (
    <div className="adminmanageposts__container__content__actions__cards">
      {allAskPosts.length > 0 ? (
        allAskPosts.map((linkPost, key) => {
          const {
            askId,
            userId,
            askTitle,
            askText,
            askTags,
            askedBy,
            upvotes,
            postedAt,
          } = linkPost;

          return (
            <ManageAskPostCard
              key={key}
              askId={askId}
              userId={userId}
              askTitle={askTitle}
              askText={askText}
              askTags={askTags}
              askedBy={askedBy}
              upvotes={upvotes}
              postedAt={postedAt}
            />
          );
        })
      ) : (
        <h1>No posts found</h1>
      )}
    </div>
  );
};

ManageAskPostCardsContainer.propTypes = {
  allAskPosts: PropTypes.array,
};

export const ManageAskPostCard = ({
  askId,
  userId,
  askTitle,
  askText,
  askTags,
  askedBy,
  upvotes,
  postedAt,
}) => {
  return (
    <div className="adminmanageposts__container__content__actions__cards__item">
      <a
        href={`/ask/${askId}`}
        className="adminmanageposts__container__content__actions__cards__item__link"
      >
        <h3 className="heading-sub adminmanageposts__container__content__actions__cards__item__heading">
          {askTitle}
        </h3>
      </a>
      <p className="paragraph-sub adminmanageposts__container__content__actions__cards__item__paragraph">
        {askText}
      </p>
      <p className="paragraph-sub adminmanageposts__container__content__actions__cards__item__paragraph">
        Asked by <a href={`/user/${userId}`}>{askedBy}</a> on {postedAt} with{" "}
        {upvotes} upvotes
      </p>
      <div className="adminmanageposts__container__content__actions__cards__item__main">
        <p className="paragraph-sub adminmanageposts__container__content__actions__cards__item__paragraph">
          {askTags}
        </p>
      </div>
      <div className="adminmanageposts__container__content__actions__cards__item__action">
        <a
          href={`/ask/edit/${askId}`}
          className="adminmanageposts__container__content__actions__cards__item__action__link"
        >
          <button className="btn btn-md adminmanageposts__container__content__actions__cards__item__action__button__primary">
            Edit
          </button>
        </a>
        <button
          className="btn btn-md adminmanageposts__container__content__actions__cards__item__action__button"
          onClick={() => console.log(askId)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

ManageAskPostCard.propTypes = {
  askId: PropTypes.string,
  userId: PropTypes.string,
  askTitle: PropTypes.string,
  askText: PropTypes.string,
  askTags: PropTypes.string,
  askedBy: PropTypes.string,
  upvotes: PropTypes.number,
  postedAt: PropTypes.string,
};

export const ManageJobPostCardsContainer = ({ allJobPosts }) => {
  return (
    <div className="adminmanageposts__container__content__actions__cards">
      {allJobPosts.length > 0 ? (
        allJobPosts.map((jobPost, key) => {
          const {
            jobId,
            userId,
            jobTitle,
            jobDescription,
            jobURL,
            isActive,
            postedAt,
          } = jobPost;

          return (
            <ManageJobPostCard
              key={key}
              jobId={jobId}
              userId={userId}
              jobTitle={jobTitle}
              jobDescription={jobDescription}
              jobURL={jobURL}
              isActive={isActive}
              postedAt={postedAt}
            />
          );
        })
      ) : (
        <h1>No posts found</h1>
      )}
    </div>
  );
};

ManageJobPostCardsContainer.propTypes = {
  allJobPosts: PropTypes.array,
};

export const ManageJobPostCard = ({
  jobId,
  jobTitle,
  jobDescription,
  jobURL,
  isActive,
  postedAt,
}) => {
  return (
    <div className="adminmanageposts__container__content__actions__cards__item">
      <a
        href={`/ask/${jobId}`}
        className="adminmanageposts__container__content__actions__cards__item__link"
      >
        <h3 className="heading-sub adminmanageposts__container__content__actions__cards__item__heading">
          {jobTitle}
        </h3>
      </a>
      <p className="paragraph-sub adminmanageposts__container__content__actions__cards__item__paragraph">
        Posed on {postedAt}
      </p>
      <p className="paragraph-sub adminmanageposts__container__content__actions__cards__item__paragraph">
        Active status {isActive ? "ACTIVE" : "FALSE"}
      </p>
      <p className="paragraph-main adminmanageposts__container__content__actions__cards__item__paragraph">
        {jobDescription}
      </p>
      <div className="adminmanageposts__container__content__actions__cards__item__action">
        <a
          href={`${jobURL}`}
          className="adminmanageposts__container__content__actions__cards__item__action__link"
        >
          <button className="btn btn-md adminmanageposts__container__content__actions__cards__item__action__button__primary">
            Link
          </button>
        </a>
        <button
          className="btn btn-md adminmanageposts__container__content__actions__cards__item__action__button"
          onClick={() => console.log(jobId)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

ManageJobPostCard.propTypes = {
  jobId: PropTypes.string,
  jobTitle: PropTypes.string,
  jobDescription: PropTypes.string,
  jobURL: PropTypes.string,
  isActive: PropTypes.bool,
  postedAt: PropTypes.string,
};
