import React from "react";
import GoogleLogin from "react-google-login";

export const LoginButtons = (props) => {
  const { handleLoginWithGithub, handleAuthFailure } = props;

  const responseGoogle = (payload) => {
    console.log(payload);
  };

  return (
    <>
      <GoogleLogin
        clientId={process.env.GOOGLE_AUTH_CLIENT_ID}
        buttonText="Login"
        approvalPrompt="force"
        prompt="consent"
        accessType="offline"
        onSuccess={responseGoogle}
        onFailure={handleAuthFailure}
        cookiePolicy={"single_host_origin"}
        render={(renderProps) => (
          <button
            className="btn btn-lg auth__container__content__buttons__container__button"
            onClick={renderProps.onClick}
          >
            <img src="https://img.icons8.com/color/48/000000/google-logo.png" />
            <p className="auth__container__content__buttons__container__button__text">
              Login with Google
            </p>
          </button>
        )}
      />
      <button
        className="btn btn-lg auth__container__content__buttons__container__button"
        onClick={handleLoginWithGithub}
      >
        <img src="https://img.icons8.com/fluent/48/000000/github.png" />
        {"   "}
        <p className="auth__container__content__buttons__container__button__text">
          Login with Github
        </p>
      </button>
    </>
  );
};

export const SignUpButtons = (props) => {
  const { handleSignupWithGithub } = props;

  const responseGoogle = (payload) => {
    console.log(payload);
  };

  return (
    <>
      <GoogleLogin
        clientId={process.env.GOOGLE_AUTH_CLIENT_ID}
        buttonText="Login"
        approvalPrompt="force"
        prompt="consent"
        accessType="offline"
        onSuccess={responseGoogle}
        onFailure={(payload) => console.log(payload)}
        cookiePolicy={"single_host_origin"}
        render={(renderProps) => (
          <button
            className="btn btn-lg auth__container__content__buttons__container__button"
            onClick={renderProps.onClick}
          >
            <img src="https://img.icons8.com/color/48/000000/google-logo.png" />
            <p className="auth__container__content__buttons__container__button__text">
              Signup with Google
            </p>
          </button>
        )}
      />
      <button
        className="btn btn-lg auth__container__content__buttons__container__button"
        onClick={handleSignupWithGithub}
      >
        <img src="https://img.icons8.com/fluent/48/000000/github.png" />

        <p className="auth__container__content__buttons__container__button__text">
          Signup with Github
        </p>
      </button>
    </>
  );
};
