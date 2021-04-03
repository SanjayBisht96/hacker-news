import { useEffect } from "react";
import axios from "axios";
import GoogleLogin from "react-google-login";

const HomePage = () => {
  // TESTING

  useEffect(() => {
    // axios({
    //   method: "get",
    //   url: `/api/routes/user/auth/signup`,
    // })
    //   .then((response) => {
    //     console.log(response.data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    console.log(process.env.GOOGLE_AUTH_CLIENT_ID)
  }, []);

  const responseGoogle = (payload) => {
    console.log(payload)
  }

  return (
    <>
      <h1 className="heading-main">Started with the APIs</h1>
      <GoogleLogin
        clientId={process.env.GOOGLE_AUTH_CLIENT_ID}
        buttonText="Login"
        approvalPrompt="force"
        prompt='consent'
        accessType="offline"
        responseType="code"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
      ,
    </>
  );
};

export default HomePage;
