import axios from "axios";

export const handleSignUpUser = async (payload) => {
  return axios({
    method: "post",
    url: '/api/user/auth/signup',
    data: {
      ...payload,
    },
  })
    .then((res) => {
      const { payload } = res.data;

      const localUserData = {
        userType: "USER",
        id: payload.id,
      };

      localStorage.setItem("data", JSON.stringify(localUserData));

      return res.data;
    })
    .catch((error) => {
      if(error.response){
        return error.response.data;
      }
      else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
        return {}
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
        return {}
      }
    });
};

export const handleLogInUser = async (payload) => {
  return axios({
    method: "post",
    url: '/api/user/auth/login',
    data: {
      ...payload,
    },
  })
    .then((res) => {
      const { payload } = res.data;

      const localUserData = {
        userType: "USER",
        id: payload.id,
      };

      localStorage.setItem("data", JSON.stringify(localUserData));

      return res.data;
    })
    .catch((error) => {
      if(error.response){
        return error.response.data;
      }
      else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
        return {}
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
        return {}
      }
    });
};

export const handleSignoutUser = () => {
  localStorage.clear();

  window.location = "/";
  return;
};

export const handleLogInAdmin = async (email, password) => {
  return axios({
    method: "post",
    url: '/api/admin/auth/login',
    data: {
      email,
      password,
    },
  })
    .then((res) => {
      const { payload } = res.data;

      const localAdminData = {
        userType: "ADMIN",
        id: payload.adminId,
      };

      localStorage.setItem("data", JSON.stringify(localAdminData));

      return res.data;
    })
    .catch((error) => {
      if(error.response){
        return error.response.data;
      }
      else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
        return {}
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
        return {}
      }
    });
};

export const handleLinkPosting = async (
  userId,
  postTitle,
  postTags,
  postURL
) => {
  return axios({
    method: "post",
    url: '/api/user/post/create',
    data: {
      userId,
      postTitle,
      postTags,
      postURL,
    },
  })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      if(error.response){
        return error.response.data;
      }
      else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
        return {}
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
        return {}
      }
    });
};

export const handleJobPosting = async (
  userId,
  jobTitle,
  jobDescription,
  jobURL
) => {
  return axios({
    method: "post",
    url: '/api/user/job/post',
    data: {
      userId,
      jobTitle,
      jobDescription,
      jobURL,
    },
  })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      if(error.response){
        return error.response.data;
      }
      else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
        return {}
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
        return {}
      }
    });
};

export const handleGetAllJobs = async () => {
  return axios({
    method: "get",
    url: '/api/admin/job',
  })
    .then((res) => {
      return res.data.payload;
    })
    .catch((error) => {
      if(error.response){
        return error.response.data;
      }
      else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
        return {}
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
        return {}
      }
    });
};

export const handleJobApproval = async (jobId, userId) => {
  return axios({
    method: "post",
    url: '/api/admin/job/approve',
    data: {
      userId,
      jobId,
    },
  })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      if(error.response){
        return error.response.data;
      }
      else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
        return {}
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
        return {}
      }
    });
};

export const handleJobReject = async (jobId, userId) => {
  return axios({
    method: "post",
    url: '/api/admin/job/reject',
    data: {
      userId,
      jobId,
    },
  })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      if(error.response){
        return error.response.data;
      }
      else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
        return {}
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
        return {}
      }
    });
};

export const handleGetAllPostsForHomepage = async () => {
  return axios({
    method: "get",
    url: `${process.env.API_ROOT}/global/post/get`,
  })
    .then((res) => {
      return res.data.payload;
    })
    .catch((error) => {
      if(error.response){
        return error.response.data;
      }
      else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
        return {}
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
        return {}
      }
    });
};
