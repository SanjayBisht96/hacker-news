import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { handleGetAllPostsForHomepage } from "client-utils/functions/handling.functions";
import { ManageLinkPostCardsContainer } from "components/sections/Cards";
import Navbar from "../../components/layouts/Navbar";
import { PaginationButtons } from "components/sections/Buttons";

const AdminManagePosts = ({ allPostsData }) => {
  const [pageNo, setPageNo] = useState(1);
  const [allLinkPosts, setAllLinkPosts] = useState([]);

  useEffect(() => {
    setAllLinkPosts(allPostsData);
  }, []);

  const handleGetAllPostsWithPageNo = async ({ isNextClicked }) => {
    let upcomingPageNo;

    if (isNextClicked) upcomingPageNo = pageNo + 1;
    else upcomingPageNo = pageNo - 1;

    const nextPageResponse = await handleGetAllPostsForHomepage(upcomingPageNo);
    setAllLinkPosts(nextPageResponse);

    setPageNo(upcomingPageNo);
  };

  return (
    <main className="adminmanageposts">
      <Navbar />

      <section className="adminmanageposts__container">
        <div className="adminmanageposts__container__content">
          <div className="adminmanageposts__container__content__header">
            <h1 className="heading-main adminmanageposts__container__content__header__heading">
              Inspect any piece of content
            </h1>
            <p className="paragraph-sub adminmanageposts__container__content__header__paragraph">
              You can delete or edit any post from here
            </p>
          </div>

          <div className="adminmanageposts__container__content__actions">
            <ManageLinkPostCardsContainer allLinkPosts={allLinkPosts} />

            <PaginationButtons
              pageNo={pageNo}
              handleGetAllPostsWithPageNo={handleGetAllPostsWithPageNo}
              allLinkPosts={allLinkPosts}
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default AdminManagePosts;

export const getServerSideProps = async () => {
  const allPostsDataResponse = await handleGetAllPostsForHomepage();

  return {
    props: { allPostsData: allPostsDataResponse },
  };
};

AdminManagePosts.propTypes = {
  allPostsData: PropTypes.array,
};
