import React, { useEffect, useState } from "react";
import { ManageJobPostCardsContainer } from "components/sections/Cards";
import Navbar from "components/layouts/Navbar";
import { handleGetAllJobPostsForUser } from "client-utils/functions/handling.functions";

const UserManageJobPosts = () => {
  const [allJobPosts, setAllJobPosts] = useState([]);

  const handleAllJobPostsForUser = async () => {
    const allJobPostsResponse = await handleGetAllJobPostsForUser();
    setAllJobPosts(allJobPostsResponse);
  };

  useEffect(() => {
    handleAllJobPostsForUser();
  }, []);

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
          </div>
        </div>
      </section>
    </main>
  );
};

export default UserManageJobPosts;
