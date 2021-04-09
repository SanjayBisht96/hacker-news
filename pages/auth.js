import React, { useState } from "react";
import Navbar from "../components/layouts/Navbar";
import { LoginButtons, SignUpButtons } from "../components/sections/userAuth";

const UserAuth = () => {
  const [loginButtonVisible, setLoginButtonVisible] = useState(true);
  const [authFailureMessage, setAuthFailureMessage] = useState("");

  const handleLoginWithGithub = () => {
    console.log("Log in with Github");
  };

  const handleSignupWithGithub = () => {
    console.log("Signup up with Github");
  };
  
  return (
    <main className="auth">
      <Navbar />

      <section className="auth__container">
        <div className="auth__container__content">
          <div className="auth__container__content__navigation">
            <button
              className={`btn btn-md auth__container__content__navigation__button ${
                loginButtonVisible &&
                "auth__container__content__navigation__button__primary"
              }`}
              onClick={() => setLoginButtonVisible(true)}
              style={{ color: loginButtonVisible ? "white" : "black" }}
            >
              Login
            </button>
            <button
              className={`btn btn-md auth__container__content__navigation__button ${
                !loginButtonVisible &&
                "auth__container__content__navigation__button__primary"
              }`}
              style={{ color: loginButtonVisible ? "black" : "white" }}
              onClick={() => setLoginButtonVisible(false)}
            >
              Signup
            </button>
          </div>
          <div className="auth__container__content__buttons">
            <div className="auth__container__content__buttons__container">
              {loginButtonVisible ? (
                <LoginButtons
                  handleLoginWithGithub={handleLoginWithGithub}
                />
              ) : (
                <SignUpButtons
                  handleSignupWithGithub={handleSignupWithGithub}
                />
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default UserAuth;
