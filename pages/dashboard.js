import React from "react";
import usePrivateRoutes from "hooks/usePrivateRoutes";
import Navbar from "components/layouts/Navbar";
import { UserDashboardActionCard } from "components/sections/Cards";

const UserDashoard = () => {
  usePrivateRoutes();

  return (
    <main className="admindashboard">
      <Navbar />

      <section className="admindashboard__container">
        <div className="admindashboard__container__content">
          <div className="admindashboard__container__content__header">
            <h1 className="heading-main admindashboard__container__content__header__heading">
              User Dashboard
            </h1>
            <p className="paragraph-sub admindashboard__container__content__header__paragraph">
              You can control content, manage users here.
            </p>
          </div>

          <div className="admindashboard__container__content__actions">
            <div className="admindashboard__container__content__actions__cards">
              <UserDashboardActionCard
                heading="Manage link posts"
                paragraph="View, edit & delete all link posts you've published"
                ctaText="Manage link posts"
                link="/user/linkposts"
              />
              <UserDashboardActionCard
                heading="Manage ask posts"
                paragraph="View, edit & delete all ask posts"
                ctaText="Manage ask posts"
                link="/user/askposts"
              />
              <UserDashboardActionCard
                heading="Manage job posts"
                paragraph="View, edit & delete all job postings"
                ctaText="Manage job posts"
                link="/user/jobposts"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default UserDashoard;
