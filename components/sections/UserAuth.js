import React, { useState } from "react";
import GoogleLogin from "react-google-login";
import Router from "next/router";
import {
  handleSignUpUser,
  handleLogInUser,
} from "../../client-utils/functions/handling.functions";

export const LoginButtons = (props) => {
  const { handleLoginWithGithub } = props;

  const [authError, setAuthError] = useState(null);

  const onGoogleLogInSuccess = async (payload) => {
    setAuthError(null);

    const { email } = payload.profileObj;

    const userLogInPayload = {
      email,
    };

    const response = await handleLogInUser(userLogInPayload);

    if (response.status === "Failed") setAuthError(response.error);
    else Router.push("/");
  };

  const handleAuthFailure = ({ error }) => {
    setAuthError(error);
  };

  return (
    <>
      <GoogleLogin
        clientId={process.env.GOOGLE_AUTH_CLIENT_ID}
        buttonText="Login"
        approvalPrompt="force"
        prompt="consent"
        accessType="offline"
        onSuccess={onGoogleLogInSuccess}
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

      {authError && <p className="form__error">{authError}</p>}
    </>
  );
};

export const SignUpButtons = (props) => {
  const { handleSignupWithGithub } = props;

  const [authError, setAuthError] = useState(null);

  const onGoogleSignUpSuccess = async (payload) => {
    setAuthError(null);

    const { name, email, imageUrl, googleId } = payload.profileObj;

    const userSignUpPayload = {
      id: googleId,
      name,
      email,
      imageUrl,
      accessToken: payload.accessToken,
      signUpWith: "GOOGLE_OAUTH",
    };

    const response = await handleSignUpUser(userSignUpPayload);

    if (response.status === "Failed") setAuthError(response.error);
    else Router.push("/");
  };

  const handleAuthFailure = ({ error }) => {
    setAuthError(error);
  };

  return (
    <>
      <GoogleLogin
        clientId={process.env.GOOGLE_AUTH_CLIENT_ID}
        buttonText="Login"
        approvalPrompt="force"
        prompt="consent"
        accessType="offline"
        onSuccess={onGoogleSignUpSuccess}
        onFailure={handleAuthFailure}
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

      {authError && <p className="form__error">{authError}</p>}
    </>
  );
};
