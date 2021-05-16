import React, { useEffect, useState } from "react";
import { ManageAskPostCardsContainer } from "components/sections/Cards";
import Navbar from "components/layouts/Navbar";
import { handleGetAllAskPostsForUser } from "client-utils/functions/handling.functions";

const UserManageAskPosts = () => {
  const [allAskPosts, setAllAskPosts] = useState([]);

  const handleAllAskPostsForUser = async () => {
    const allAskPostsResponse = await handleGetAllAskPostsForUser();
    setAllAskPosts(allAskPostsResponse);
  };

  useEffect(() => {
    handleAllAskPostsForUser();
  }, []);

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
          </div>
        </div>
      </section>
    </main>
  );
};

export default UserManageAskPosts;