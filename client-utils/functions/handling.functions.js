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

export const handleLogInAdmin = async (email, password) => {
  return axios({
    method: "post",
    url: `${process.env.API_ROOT}/admin/auth/login`,
    data: {
      email,
      password,
    },
  })
    .then((res) => {
      const { payload } = res.data;

      const localAdminData = {
        adminId: payload.adminId,
      };

      localStorage.setItem("adminData", JSON.stringify(localAdminData));

      return res.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};

export const handleJobPosting = async (jobTitle, jobDescription, jobURL) => {
  return axios({
    method: "post",
    url: `${process.env.API_ROOT}/user/job/post`,
    data: {
      // TODO: CHANGE USERID
      userId:
        "d182f0677b21e163464078041e1774a056eae3061cc6204d412d8f52fad4290eee0b20ab612d1e815f8b1c4f09ec0f4788cc4e086acdd73b13b2d5819af1c0056923b7fb63ed75f93f668dfcb77796cbbe21203c1ba8f7a07f89b89e8b96f45c672638e581eba30b67f0758b3521752c4e659046369d10ad00a78893e7c01c293a228b8a",
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

export const handleGetAllJobs = async () => {
  return axios({
    method: "get",
    url: `${process.env.API_ROOT}/admin/job`,
  })
    .then((res) => {
      return res.data.payload;
    })
    .catch((error) => {
      return error.response.data;
    });
};

export const handleJobApproval = async (jobId, userId) => {
  return axios({
    method: "post",
    url: `${process.env.API_ROOT}/admin/job/approve`,
    data: {
      userId,
      jobId,
    },
  })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};

export const handleJobReject = async (jobId, userId) => {
  return axios({
    method: "post",
    url: `${process.env.API_ROOT}/admin/job/reject`,
    data: {
      userId,
      jobId,
    },
  })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};
