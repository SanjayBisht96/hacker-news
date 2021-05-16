import React, { useEffect, useState } from "react";
import { ManageJobPostCardsContainer } from "components/sections/Cards";
import Navbar from "components/layouts/Navbar";
import { handleGetAllJobPostsForUser } from "client-utils/functions/handling.functions";
import { PaginationButtons } from "components/sections/Buttons";

const UserManageJobPosts = () => {
  const [pageNo, setPageNo] = useState(1);
  const [allJobPosts, setAllJobPosts] = useState([]);

  const fetchAllJobPostsForUser = async () => {
    const allJobPostsResponse = await handleGetAllJobPostsForUser();
    setAllJobPosts(allJobPostsResponse);
  };

  useEffect(() => {
    fetchAllJobPostsForUser();
  }, []);

  const handleGetAllPostsWithPageNo = async ({ isNextClicked }) => {
    let upComingPageNo;

    if (isNextClicked) upComingPageNo = pageNo + 1;
    else upComingPageNo = pageNo - 1;

    const nextPageResponse = await handleGetAllJobPostsForUser(upComingPageNo);
    setAllJobPosts(nextPageResponse);

    setPageNo(upComingPageNo);
  };

  return (
    <main className="adminmanageposts">
      <Navbar />

      <section className="adminmanageposts__container">
        <div className="adminmanageposts__container__content">
          <div className="adminmanageposts__container__content__header">
            <h1 className="heading-main adminmanageposts__container__content__header__heading">
              Manage job posts here
            </h1>
            <p className="paragraph-sub adminmanageposts__container__content__header__paragraph">
              You can delete or edit any post from here
            </p>
          </div>

          <div className="adminmanageposts__container__content__actions">
            <ManageJobPostCardsContainer allJobPosts={allJobPosts} />

            <PaginationButtons
              pageNo={pageNo}
              handleGetAllPostsWithPageNo={handleGetAllPostsWithPageNo}
              listOfPosts={allJobPosts}
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default UserManageJobPosts;
