import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Navbar from "components/layouts/Navbar";
import { handleGetAllPostsForHomepage } from "client-utils/functions/handling.functions";
import { LinkPostCardsContainer } from "components/sections/Cards";

const HomePage = ({ allPostsData }) => {
  const [pageNo, setPageNo] = useState(1);
  const [allPostsList, setAllPostsList] = useState([]);

  useEffect(() => {
    setAllPostsList(allPostsData);
  }, []);

  const handleGetAllPostsWithPageNo = async ({ isNextClicked }) => {
    let upcomingPageNo;

    if (isNextClicked) upcomingPageNo = pageNo + 1;
    else upcomingPageNo = pageNo - 1;

    const nextPageResponse = await handleGetAllPostsForHomepage(upcomingPageNo);
    setAllPostsList(nextPageResponse);

    setPageNo(upcomingPageNo);
  };

  console.log(allPostsList)

  return (
    <main className="homepage">
      <Navbar />

      <section className="homepage__container">
        <div className="homepage__container__content">
          <div className="homepage__container__content__header">
            <h1 className="heading-sub homepage__container__content__header__heading">
              All posts
            </h1>
          </div>
          <div className="homepage__container__content__main">
            <LinkPostCardsContainer allPostsList={allPostsList} />

            <div className="homepage__container__content__main__actions">
              {pageNo > 1 && (
                <button
                  className="btn btn-sm homepage__container__content__main__actions__button"
                  onClick={() =>
                    handleGetAllPostsWithPageNo({ isNextClicked: false })
                  }
                >
                  Prev
                </button>
              )}

              {allPostsList.length > 0 && (
                <button
                  className="btn btn-sm homepage__container__content__main__actions__button"
                  onClick={() =>
                    handleGetAllPostsWithPageNo({ isNextClicked: true })
                  }
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;

export const getServerSideProps = async () => {
  const allPostsDataResponse = await handleGetAllPostsForHomepage();

  return {
    props: { allPostsData: allPostsDataResponse },
  };
};

HomePage.propTypes = {
  allPostsData: PropTypes.array,
};
