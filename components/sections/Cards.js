import PropTypes from "prop-types";

export const PostCard = ({
  postId,
  postTitle,
  postedBy,
  postedBefore,
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
            {postedBefore}
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
  postedBefore: PropTypes.string,
  postComments: PropTypes.string,
  postUpvotes: PropTypes.string,
};
