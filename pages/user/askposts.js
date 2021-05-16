import React, { useEffect, useState } from "react";
import { ManageAskPostCardsContainer } from "components/sections/Cards";
import Navbar from "components/layouts/Navbar";
import { handleGetAllAskPostsForUser } from "client-utils/functions/handling.functions";
import { PaginationButtons } from "components/sections/Buttons";

const UserManageAskPosts = () => {
  const [pageNo, setPageNo] = useState(1);
  const [allAskPosts, setAllAskPosts] = useState([]);

  const fetchAllAskPostsForUser = async () => {
    const allAskPostsResponse = await handleGetAllAskPostsForUser();
    setAllAskPosts(allAskPostsResponse);
  };

  useEffect(() => {
    fetchAllAskPostsForUser();
  }, []);

  const handleGetAllPostsWithPageNo = async ({ isNextClicked }) => {
    let upComingPageNo;

    if (isNextClicked) upComingPageNo = pageNo + 1;
    else upComingPageNo = pageNo - 1;

    const nextPageResponse = await handleGetAllAskPostsForUser(upComingPageNo);
    setAllAskPosts(nextPageResponse);

    setPageNo(upComingPageNo);
  };

  return (
    <main className="adminmanageposts">
      <Navbar />

      <section className="adminmanageposts__container">
        <div className="adminmanageposts__container__content">
          <div className="adminmanageposts__container__content__header">
            <h1 className="heading-main adminmanageposts__container__content__header__heading">
              Manage all link posts here
            </h1>
            <p className="paragraph-sub adminmanageposts__container__content__header__paragraph">
              You can delete or edit any post from here
            </p>
          </div>

          <div className="adminmanageposts__container__content__actions">
            <ManageAskPostCardsContainer allAskPosts={allAskPosts} />

            <PaginationButtons
              pageNo={pageNo}
              handleGetAllPostsWithPageNo={handleGetAllPostsWithPageNo}
              listOfPosts={allAskPosts}
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default UserManageAskPosts;
