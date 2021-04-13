import React from "react";
import Navbar from "../../components/layouts/Navbar";

const AdminApproveJobs = () => {
  return (
    <main className="adminapprovejobs">
      <Navbar />

      <section className="adminapprovejobs__container">
        <div className="adminapprovejobs__container__content">
          <div className="adminapprovejobs__container__content__header">
            <h1 className="heading-main adminapprovejobs__container__content__header__heading">
              Approve job posting
            </h1>
            <p className="paragraph-sub adminapprovejobs__container__content__header__paragraph">
              Approve a job if it fits our content policy
            </p>
          </div>

          <div className="adminapprovejobs__container__content__actions">
            <div className="adminapprovejobs__container__content__actions__cards">
              <AdminDashboardJobApproval
                jobTitle="BuildZoom (YC W13) is hiring a growth associate"
                jobDescription="Control the jobs that will be posted on the platform"
                jobURL="https://jobs.lever.co/buildzoom"
              />
              <AdminDashboardJobApproval
                jobTitle="BuildZoom (YC W13) is hiring a growth associate"
                jobDescription="Edit or delete any post"
                ctaText="Manage users"
                jobURL="https://jobs.lever.co/buildzoom"
              />
              <AdminDashboardJobApproval
                jobTitle="BuildZoom (YC W13) is hiring a growth associate"
                jobDescription="List of all users on the platform"
                ctaText="All users"
                jobURL="https://jobs.lever.co/buildzoom"
              />
              <AdminDashboardJobApproval
                jobTitle="BuildZoom (YC W13) is hiring a growth associate"
                jobDescription="List of all users on the platform"
                ctaText="All users"
                jobURL="https://jobs.lever.co/buildzoom"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AdminApproveJobs;

const AdminDashboardJobApproval = ({ jobTitle, jobDescription, jobURL }) => {
  return (
    <div className="adminapprovejobs__container__content__actions__cards__item">
      <h3 className="heading-sub adminapprovejobs__container__content__actions__cards__item__heading">
        {jobTitle}
      </h3>
      <p className="paragraph-sub adminapprovejobs__container__content__actions__cards__item__paragraph">
        {jobDescription}
      </p>
      <a href={jobURL} target="_black">
        <button className="btn btn-sm adminapprovejobs__container__content__actions__cards__item__button">
          View full job description
        </button>
      </a>
      <div className="adminapprovejobs__container__content__actions__cards__item__action">
        <button className="btn btn-md adminapprovejobs__container__content__actions__cards__item__action__button__primary">
          Approve
        </button>
        <button className="btn btn-md adminapprovejobs__container__content__actions__cards__item__action__button">
          Remove
        </button>
      </div>
    </div>
  );
};
