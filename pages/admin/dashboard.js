import React from "react";
import Navbar from "../../components/layouts/Navbar";

const AdminDashoard = () => {
  return (
    <main className="admindashboard">
      <Navbar />

      <section className="admindashboard__container">
        <div className="admindashboard__container__content">
          <div className="admindashboard__container__content__header">
            <h1 className="heading-main admindashboard__container__content__header__heading">
              Admin Dashboard
            </h1>
            <p className="paragraph-sub admindashboard__container__content__header__paragraph">
              You can control content, manage users here.
            </p>
          </div>

          <div className="admindashboard__container__content__actions">
            <div className="admindashboard__container__content__actions__cards">
              <AdminDashboardActionCard
                heading="Approve Job Postings"
                paragraph=" Control the jobs that will be posted on the platform"
                ctaText="Approve"
                link="/admin/approve-jobs"
              />
              <AdminDashboardActionCard
                heading="View All Posts"
                paragraph="Edit or delete any post"
                ctaText="Manage users"
                link="/admin/manage-posts"
              />
              <AdminDashboardActionCard
                heading="View all users"
                paragraph="List of all users on the platform"
                ctaText="All users"
                link="/admin/all-users"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AdminDashoard;

const AdminDashboardActionCard = ({ heading, paragraph, ctaText, link }) => {
  return (
    <div className="admindashboard__container__content__actions__cards__item">
      <h3 className="heading-sub admindashboard__container__content__actions__cards__item__heading">
        {heading}
      </h3>
      <p className="paragraph-sub admindashboard__container__content__actions__cards__item__paragraph">
        {paragraph}
      </p>
      <a href={link}>
        <button className="btn btn-md admindashboard__container__content__actions__cards__item__button">
          {ctaText}
        </button>
      </a>
    </div>
  );
};
