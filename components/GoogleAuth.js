import React from "react";

const GoogleAuth = () => {
  return (
    <GoogleLogin
      clientId={process.env.GOOGLE_AUTH_CLIENT_ID}
      buttonText="Login"
      approvalPrompt="force"
      prompt="consent"
      accessType="offline"
      // responseType="code"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={"single_host_origin"}
    />
  );
};

export default GoogleAuth;
