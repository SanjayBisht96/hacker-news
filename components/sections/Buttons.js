import PropTypes from "prop-types";

export const PaginationButtons = ({
  pageNo,
  handleGetAllPostsWithPageNo,
  listOfPosts,
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

      {listOfPosts.length > 0 && (
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
  listOfPosts: PropTypes.array,
};
