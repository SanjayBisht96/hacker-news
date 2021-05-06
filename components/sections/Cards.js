import PropTypes from "prop-types";

export const PostCard = ({
  postId,
  postTitle,
  postedBy,
  postedDate,
  postComments,
  postUpvotes,
}) => {
  return (
    <div className="homepage__container__content__main__posts__item">
      <div className="homepage__container__content__main__posts__item__action">
        <h3 className="heading-main">{postUpvotes}</h3>
        <div className="homepage__container__content__main__posts__item__action__container">
          <button className="btn btn-sm homepage__container__content__main__posts__item__action__container__button">
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
          <button className="btn btn-sm homepage__container__content__main__posts__item__action__container__button">
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
        <a href={`/post/${postId}`}>
          <h2 className="heading-sub homepage__container__content__main__posts__item__content__heading">
            {postTitle}
          </h2>
        </a>
        <div className="homepage__container__content__main__posts__item__content__footer">
          <p className="paragraph--sub homepage__container__content__main__posts__item__content__footer__paragraph">
            Posted by {postedBy}
          </p>
          <p className="paragraph--sub homepage__container__content__main__posts__item__content__footer__paragraph">
            {postedDate}
          </p>
          <p className="paragraph--sub homepage__container__content__main__posts__item__content__footer__paragraph">
            {postComments}
          </p>
          <p className="paragraph--sub homepage__container__content__main__posts__item__content__footer__paragraph">
            <a href={'discussion/'+postId}>discuss</a>
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

const AdminDashboardActionCard = ({ heading, paragraph, ctaText, link }) => {
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

export const UserManageLinkPostCard = ({
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
        <button className="btn btn-md adminmanageposts__container__content__actions__cards__item__action__button">
          Delete
        </button>
      </div>
    </div>
  );
};

UserManageLinkPostCard.propTypes = {
  postId: PropTypes.string,
  postTitle: PropTypes.string,
  postUrl: PropTypes.string,
  postTags: PropTypes.string,
  postedBy: PropTypes.string,
  postedAt: PropTypes.string,
};
