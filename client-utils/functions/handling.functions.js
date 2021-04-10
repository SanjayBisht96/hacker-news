import axios from "axios";

export const handleSignUpUser = async (payload) => {
  return axios({
    method: "post",
    url: `${process.env.API_ROOT}/user/auth/signup`,
    data: {
      ...payload,
    },
  })
    .then((res) => {
      const { payload } = res.data;

      const localUserData = {
        userId: payload.id,
      };

      localStorage.setItem("userData", JSON.stringify(localUserData));

      return res.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};

export const handleLogInUser = async (payload) => {
  return axios({
    method: "post",
    url: `${process.env.API_ROOT}/user/auth/login`,
    data: {
      ...payload,
    },
  })
    .then((res) => {
      const { payload } = res.data;

      const localUserData = {
        userId: payload.id,
      };

      localStorage.setItem("userData", JSON.stringify(localUserData));

      return res.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};

export const handleJobPosting = async (
  event,
  jobTitle,
  jobDescription,
  jobURL
) => {
  event.preventDefault();

  return axios({
    method: "post",
    url: `${process.env.API_ROOT}/user/job/post`,
    data: {
      jobTitle,
      jobDescription,
      jobURL,
    },
  })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};
