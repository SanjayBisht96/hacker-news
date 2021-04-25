import React, { useState } from "react";
import Router from "next/router";
import Navbar from "../../components/layouts/Navbar";
import { FormLabelInputGroup } from "../../components/sections/FormElements";
import { handleLogInAdmin } from "../../client-utils/functions/handling.functions";
import usePrivateRoutes from "hooks/usePrivateRoutes";

const AdminAuth = () => {
  usePrivateRoutes();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");
  const [isSubmitClicked, setIsSubmitClicked] = useState(false);

  const onLoginClicked = async (event) => {
    event.preventDefault();

    setIsSubmitClicked(true);
    setFormError("");

    const adminLoginResponse = await handleLogInAdmin(email, password);

    if (adminLoginResponse.status === "Failed") {
      setFormError(adminLoginResponse.error);
      setIsSubmitClicked(false);
    } else {
      Router.push("/admin/dashboard");
    }
  };

  return (
    <main className="auth">
      <Navbar />

      <section className="auth__container">
        <div className="auth__container__content">
          <div className="auth__container__content__navigation">
            <h1 className="heading-main">Login</h1>
          </div>
          <div className="auth__container__content__main">
            <div className="auth__container__content__main__container">
              <form className="form auth__container__content__main__container__form">
                <FormLabelInputGroup
                  label="Enter your email"
                  inputType="text"
                  handleInput={(event) => setEmail(event.target.value)}
                />
                <FormLabelInputGroup
                  label="Enter your password"
                  inputType="password"
                  handleInput={(event) => setPassword(event.target.value)}
                />
                <button
                  className="btn btn-md form__submit"
                  onClick={onLoginClicked}
                >
                  {!isSubmitClicked ? "Login As Admin" : "Logging in..."}
                </button>
              </form>
              {formError && <p className="form__error">{formError}</p>}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AdminAuth;
