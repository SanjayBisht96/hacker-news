import React from "react";
import Navbar from "../../components/layouts/Navbar";

const AdminManagePosts = () => {
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
            <div className="adminmanageposts__container__content__actions__cards">
              <AdminManagePostCard
                postId="1"
                postTitle="BuildZoom (YC W13) is hiring a growth associate"
                postUrl="Control the jobs that will be posted on the platform"
                postTags="#html, #css, #js"
                postedBy="imsks"
                postedAt="21 Apr, 2021"
              />
              <AdminManagePostCard
                postId="1"
                postTitle="BuildZoom (YC W13) is hiring a growth associate"
                postUrl="Edit or delete any post"
                postTags="#html, #css, #js"
                postedBy="imsks"
                postedAt="21 Apr, 2021"
              />
              <AdminManagePostCard
                postId="1"
                postTitle="BuildZoom (YC W13) is hiring a growth associate"
                postUrl="List of all users on the platform"
                postTags="#html, #css, #js"
                postedBy="imsks"
                postedAt="21 Apr, 2021"
              />
              <AdminManagePostCard
                postId="1"
                postTitle="BuildZoom (YC W13) is hiring a growth associate"
                postUrl="List of all users on the platform"
                postTags="#html, #css, #js"
                postedBy="imsks"
                postedAt="21 Apr, 2021"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AdminManagePosts;

const AdminManagePostCard = ({
  postId,
  postTitle,
  postUrl,
  postTags,
  postedBy,
  postedAt,
}) => {
  return (
    <div className="adminmanageposts__container__content__actions__cards__item">
      <a
        href={`/post/${postId}`}
        className="adminmanageposts__container__content__actions__cards__item__link"
      >
        <h3 className="heading-sub adminmanageposts__container__content__actions__cards__item__heading">
          {postTitle}
        </h3>
      </a>
      <p className="paragraph-sub adminmanageposts__container__content__actions__cards__item__paragraph">
        Posted by {postedBy} on {postedAt}
      </p>
      <div className="adminmanageposts__container__content__actions__cards__item__main">
        <p className="paragraph-sub adminmanageposts__container__content__actions__cards__item__paragraph">
          {postTags}
        </p>
        <a href={postUrl} target="_black">
          <button className="btn btn-sm adminmanageposts__container__content__actions__cards__item__button">
            Link
          </button>
        </a>
      </div>
      <div className="adminmanageposts__container__content__actions__cards__item__action">
        <a href={`/post/edit/${postId}`}>
          <button className="btn btn-md adminmanageposts__container__content__actions__cards__item__action__button__primary">
            Edit
          </button>
        </a>
        <button className="btn btn-md adminmanageposts__container__content__actions__cards__item__action__button">
          Delete
        </button>
      </div>
    </div>
  );
};
