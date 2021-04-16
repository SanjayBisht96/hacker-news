import React, { useEffect, useState } from "react";
import Navbar from "components/layouts/Navbar";
import { handleGetAllJobs } from "client-utils/functions/handling.functions";

const AdminApproveJobs = () => {
  const [allJobsData, setAllJobsData] = useState([]);

  const onHandlingFetchAllJobs = async () => {
    const allJobsFetchingResponse = await handleGetAllJobs();
    setAllJobsData(allJobsFetchingResponse);
  };

  useEffect(() => {
    onHandlingFetchAllJobs();
  }, []);

  console.log(allJobsData);

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
            {allJobsData.length >= 0 ? (
              <div className="adminapprovejobs__container__content__actions__cards">
                {allJobsData.map((jobData, key) => {
                  const {
                    id,
                    jobTitle,
                    jobDescription,
                    jobURL,
                    postedOn,
                    userId,
                    isRejected,
                    isActive,
                  } = jobData;

                  return (
                    <AdminDashboardJobApproval
                      id={id}
                      jobTitle={jobTitle}
                      jobDescription={jobDescription}
                      jobURL={jobURL}
                      postedOn={postedOn}
                      userId={userId}
                      isRejected={isRejected}
                      isActive={isActive}
                      key={key}
                    />
                  );
                })}
              </div>
            ) : (
              <h1>Loading...</h1>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default AdminApproveJobs;

const AdminDashboardJobApproval = ({
  id,
  jobTitle,
  jobDescription,
  jobURL,
  postedOn,
  userId,
  isRejected,
  isActive,
}) => {
  return (
    <div
      className="adminapprovejobs__container__content__actions__cards__item"
      key={id}
    >
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
        <button
          className={`btn btn-md adminapprovejobs__container__content__actions__cards__item__action__button__primary`}
        >
          {isActive ? "Approved" : "Approve"}
        </button>
        <button
          className={`btn btn-md adminapprovejobs__container__content__actions__cards__item__action__button`}
        >
          {isRejected ? "Rejected" : "Remove"}
        </button>
      </div>
    </div>
  );
};
