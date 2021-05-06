import React from "react";
import usePrivateRoutes from "hooks/usePrivateRoutes";
import Navbar from "components/layouts/Navbar";
import { AdminDashboardActionCard } from 'components/sections/Cards';

const AdminDashoard = () => {
  usePrivateRoutes();

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
                ctaText="View job posting"
                link="/admin/approve-jobs"
              />
              <AdminDashboardActionCard
                heading="Manage all posts"
                paragraph="View, edit or delete any post"
                ctaText="Manage posts"
                link="/admin/manage-posts"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AdminDashoard;
