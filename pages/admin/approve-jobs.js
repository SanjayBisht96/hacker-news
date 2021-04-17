import React, { useEffect, useState } from "react";
import Navbar from "components/layouts/Navbar";
import {
  handleGetAllJobs,
  handleJobApproval,
  handleJobReject,
} from "client-utils/functions/handling.functions";

const AdminApproveJobs = () => {
  const [allJobsData, setAllJobsData] = useState([]);
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [togglePageReRender, setTogglePageReRender] = useState(false);

  const onHandlingFetchAllJobs = async () => {
    const allJobsFetchingResponse = await handleGetAllJobs();
    setAllJobsData(allJobsFetchingResponse);
    setIsPageLoaded(true);
  };

  useEffect(() => {
    onHandlingFetchAllJobs();
  }, [togglePageReRender]);

  const onApproveJobClicked = async (event, jobId, userId) => {
    event.preventDefault();

    const jobApprovalResponse = await handleJobApproval(jobId, userId);
    console.log(jobApprovalResponse);

    if (jobApprovalResponse.status === "Success") setTogglePageReRender(!togglePageReRender);
  };

  const onRejectJobClicked = async (event, jobId, userId) => {
    event.preventDefault();

    const jobRejectResponse = await handleJobReject(jobId, userId);

    if (jobRejectResponse.status === "Success") setTogglePageReRender(!togglePageReRender);
  };

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
            {isPageLoaded ? (
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

                  return allJobsData.length >= 0 ? (
                    <AdminDashboardJobApproval
                      id={id}
                      jobTitle={jobTitle}
                      jobDescription={jobDescription}
                      jobURL={jobURL}
                      postedOn={postedOn}
                      userId={userId}
                      isRejected={isRejected}
                      isActive={isActive}
                      onApproveJobClicked={onApproveJobClicked}
                      onRejectJobClicked={onRejectJobClicked}
                      key={key}
                    />
                  ) : (
                    <h1>No jobs found</h1>
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
  onApproveJobClicked,
  onRejectJobClicked,
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
        {!isRejected && (
          <button
            className={`btn btn-md adminapprovejobs__container__content__actions__cards__item__action__button__primary`}
            onClick={(event) => onApproveJobClicked(event, id, userId)}
            disabled={isActive}
          >
            {isActive ? "Approved" : "Approve"}
          </button>
        )}
        {!isActive && (
          <button
            className={`btn btn-md adminapprovejobs__container__content__actions__cards__item__action__button`}
            onClick={(event) => onRejectJobClicked(event, id, userId)}
            disabled={isRejected}
          >
            {isRejected ? "Rejected" : "Remove"}
          </button>
        )}
      </div>
    </div>
  );
};
