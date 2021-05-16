import PropTypes from "prop-types";

export const PaginationButtons = ({
  pageNo,
  handleGetAllPostsWithPageNo,
  allLinkPosts,
}) => {
  return (
    <div className="homepage__container__content__main__actions">
      {pageNo > 1 && (
        <button
          className="btn btn-sm homepage__container__content__main__actions__button"
          onClick={() => handleGetAllPostsWithPageNo({ isNextClicked: false })}
        >
          Prev
        </button>
      )}

      {allLinkPosts.length > 0 && (
        <button
          className="btn btn-sm homepage__container__content__main__actions__button"
          onClick={() => handleGetAllPostsWithPageNo({ isNextClicked: true })}
        >
          Next
        </button>
      )}
    </div>
  );
};

PaginationButtons.propTypes = {
  pageNo: PropTypes.number,
  handleGetAllPostsWithPageNo: PropTypes.func,
  allLinkPosts: PropTypes.array,
};
