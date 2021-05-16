import axios from "axios";
import { ADMIN_TOKEN_NAME, USER_TOKEN_NAME } from "const";
import useAuth from "hooks/useAuth";
import { setTokenCookie } from "./auth.functions";


export const handleSignUpUser = async (payload) => {
  return axios({
    method: "post",
    url: "/api/user/auth/signup",
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

      setTokenCookie(res, localUserData);

      return res.data;
    })
    .catch((error) => {
      if (error.response) {
        return error.response.data;
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
        return {};
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
        return {};
      }
    });
};

export const handleLogInUser = async (payload) => {
  return axios({
    method: "post",
    url: "/api/user/auth/login",
    data: {
      ...payload,
    },
  })
    .then((res) => {
      const { payload } = res.data;

      const localUserData = {
        userType: USER_TOKEN_NAME,
        id: payload.id,
      };

      localStorage.setItem("data", JSON.stringify(localUserData));

      setTokenCookie(res, localUserData);

      return res.data;
    })
    .catch((error) => {
      if (error.response) {
        return error.response.data;
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
        return {};
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
        return {};
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
    url: "/api/admin/auth/login",
    data: {
      email,
      password,
    },
  })
    .then((res) => {
      const { payload } = res.data;

      const localAdminData = {
        userType: ADMIN_TOKEN_NAME,
        id: payload.adminId,
      };

      localStorage.setItem("data", JSON.stringify(localAdminData));

      setTokenCookie(res, localAdminData);

      return res.data;
    })
    .catch((error) => {
      if (error.response) {
        return error.response.data;
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
        return {};
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
        return {};
      }
    });
};

// Handle link posting
export const handleLinkPosting = async (
  userId,
  postTitle,
  postTags,
  postURL
) => {
  return axios({
    method: "post",
    url: "/api/user/post/create",
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
      if (error.response) {
        return error.response.data;
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
        return {};
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
        return {};
      }
    });
};

// Handle ask posting
export const handleAskPosting = async (userId, askTitle, askTags, askText) => {
  return axios({
    method: "post",
    url: "/api/user/ask/create",
    data: {
      userId,
      askTitle,
      askText,
      askTags,
    },
  })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      if (error.response) {
        return error.response.data;
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
        return {};
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
        return {};
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
    url: "/api/user/job/post",
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
      if (error.response) {
        return error.response.data;
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
        return {};
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
        return {};
      }
    });
};

export const handleGetAllJobs = async () => {
  return axios({
    method: "get",
    url: "/api/admin/job",
  })
    .then((res) => {
      return res.data.payload;
    })
    .catch((error) => {
      if (error.response) {
        return error.response.data;
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
        return {};
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
        return {};
      }
    });
};

export const handleJobApproval = async (jobId, userId) => {
  return axios({
    method: "post",
    url: "/api/admin/job/approve",
    data: {
      userId,
      jobId,
    },
  })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      if (error.response) {
        return error.response.data;
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
        return {};
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
        return {};
      }
    });
};

export const handleJobReject = async (jobId, userId) => {
  return axios({
    method: "post",
    url: "/api/admin/job/reject",
    data: {
      userId,
      jobId,
    },
  })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      if (error.response) {
        return error.response.data;
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
        return {};
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
        return {};
      }
    });
};

export const handleGetAllPostsForHomepage = async (page = 1, sortBy = 'date') => {  
  return axios({
    method: "get",
    url: `${process.env.API_ROOT}/global/post/get?page=${page}&sortBy=${sortBy}`,
  })
    .then((res) => {
      return res.data.payload;
    })
    .catch((error) => {
      if (error.response) {
        return error.response.data;
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
        return {};
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
        return {};
      }
    });
};

export const handleGetAllLinkPostsForUser = async (pageNo = 1) => {
  const { id } = useAuth();

  return axios({
    method: "post",
    url: `${process.env.API_ROOT}/user/post/get?sortBy=date&page=${pageNo}`,
    data: {
      userId: id,
    },
  })
    .then((res) => {
      return res.data.payload;
    })
    .catch((error) => {
      if (error.response) {
        return error.response.data;
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
        return {};
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
        return {};
      }
    });
};

export const handleGetAllAskPostsForUser = async (pageNo = 1) => {
  const { id } = useAuth();

  return axios({
    method: "post",
    url: `${process.env.API_ROOT}/user/ask/get?sortBy=date&page=${pageNo}`,
    data: {
      userId: id,
    },
  })
    .then((res) => {
      return res.data.payload;
    })
    .catch((error) => {
      if (error.response) {
        return error.response.data;
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
        return {};
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
        return {};
      }
    });
};

export const handleGetAllJobPostsForUser = async (pageNo = 1) => {
  const { id } = useAuth();

  return axios({
    method: "post",
    url: `${process.env.API_ROOT}/user/job/get?sortBy=date&page=${pageNo}`,
    data: {
      userId: id,
    },
  })
    .then((res) => {
      return res.data.payload;
    })
    .catch((error) => {
      if (error.response) {
        return error.response.data;
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
        return {};
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
        return {};
      }
    });
};


// add Comments
export const addComment = async (postID,userID,commentInput) => {
  const payload = {postID,userID,commentInput};
  return axios({
    method: "post",
    url: '/api/comment/addcomment',
    data: {
      ...payload,
    },
  })
    .then((res) => {
      const { payload } = res.data;
      return payload;
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


// Fetch Comments
export const fetchComments = async (url,postID) => {
  const payload = {postID};
  return axios({
    method: "post",
    url: url,
    data: {
      ...payload,
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



// add Replies
export const addReply = async (userID,parentID,commentInput) => {
  const payload = {userID,parentID,commentInput};
  return axios({
    method: "post",
    url: '/api/comment/addreply',
    data: {
      ...payload,
    },
  })
    .then((res) => {
      const { payload } = res.data;
      return payload;
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


//fetchReplies
export const fetchReplies = async (url,parentID) => {
  const payload = {parentID};
  return axios({
    method: "post",
    url: url,
    data: {
      ...payload,
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


//addVote and downVote
export const updateVote = async (url,payload) => {
  return axios({
    method: "post",
    url: url,
    data: {
      ...payload,
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


//addVote and downVote
export const getVote = async (url,payload) => {
  return axios({
    method: "post",
    url: url,
    data: {
      ...payload,
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

// Get link post by ID
export const getLinkPostById = async (payload) => {
  return axios({
    method: "post",
    url: '/api/global/post/get-post',
    data: {
      ...payload,
    },
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

// Update link post by ID
export const updateLinkPostById = async (payload) => {
  console.log(payload)
  return axios({
    method: "patch",
    url: '/api/global/post/edit',
    data: {
      ...payload,
    },
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

// Update link post by ID
export const updateAskPostById = async (payload) => {
  console.log(payload)
  return axios({
    method: "patch",
    url: '/api/global/ask/edit',
    data: {
      ...payload,
    },
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

// Get ask post by ID
export const getAskPostById = async (payload) => {
  return axios({
    method: "post",
    url: '/api/global/ask/get-post',
    data: {
      ...payload,
    },
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