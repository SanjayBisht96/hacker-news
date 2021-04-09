import axios from "axios";

export const signUpUser = (payload) => {
    console.log(payload)
    
  axios({
    method: "post",
    url: `${process.env.API_ROOT}/user/auth/signUpWithGoogle`,
    data: {
      payload,
    },
  })
    .then((res) => {
      console.log(res.data);
    })
    .catch((error) => {
      console.log(error.response.data);
    });
};
