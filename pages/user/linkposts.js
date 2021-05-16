import React, { useEffect, useState } from "react";
import { ManageLinkPostCardsContainer } from "components/sections/Cards";
import Navbar from "components/layouts/Navbar";
import { handleGetAllLinkPostsForUser } from "client-utils/functions/handling.functions";

const UserManageLinkPosts = () => {
  const [allLinkPosts, setAllLinkPosts] = useState([]);

  const handleAllLinkPostsForUser = async () => {
    const allLinkPostsResponse = await handleGetAllLinkPostsForUser();
    setAllLinkPosts(allLinkPostsResponse);
  };

  useEffect(() => {
    handleAllLinkPostsForUser();
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
            <ManageLinkPostCardsContainer allLinkPosts={allLinkPosts} />
          </div>
        </div>
      </section>
    </main>
  );
};

export default UserManageLinkPosts;