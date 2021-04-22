import { useEffect, useState } from "react";
import { useAuth } from "client-utils/hooks/auth";
import React from "react";
import { handleSignoutUser } from "client-utils/functions/handling.functions";

const Navbar = () => {
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    const userData = useAuth();

    if (userData) {
      setUserType(userData.type);
    }
  });

  console.log(userType);

  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <a href="/" className="navbar__logo__link">
          Hacker News
        </a>
      </div>
      {renderNavbar(userType)}
    </nav>
  );
};

export default Navbar;

const renderNavbar = (userType) => {
  console.log(userType);
  if (userType === "ADMIN") return NavbarLinksForAdmin();
  else if (userType === "USER") return NavbarLinksForUser();
  else return NavbarLinksForNonUsers();
};

const NavbarLinksForNonUsers = () => {
  return (
    <div className="navbar__links">
      <a href="/create/post" className="navbar__links__item">
        Create Post
      </a>
      <a href="/create/job" className="navbar__links__item">
        Create Job Posting
      </a>
      <a href="#" className="navbar__links__item">
        Ask HN
      </a>
      <a href="/auth" className="navbar__links__item">
        <button className="btn btn-sm navbar__links__button">Login</button>
      </a>
    </div>
  );
};

const NavbarLinksForAdmin = () => {
  return (
    <div className="navbar__links">
      <a href="/admin/dashboard">
        <button className="btn btn-sm navbar__links__button">Profile</button>
      </a>
      <button
        className="btn btn-sm navbar__links__button"
        onClick={handleSignoutUser}
      >
        Signout
      </button>
    </div>
  );
};

const NavbarLinksForUser = () => {
  return (
    <div className="navbar__links">
      <a href="/create/post" className="navbar__links__item">
        Create Post
      </a>
      <a href="/create/job" className="navbar__links__item">
        Create Job Posting
      </a>
      <a href="#" className="navbar__links__item">
        Ask HN
      </a>
      <a href="/user/dashboard" className="navbar__links__item">
        <button className="btn btn-sm navbar__links__button">Profile</button>
      </a>
      <button
        className="btn btn-sm navbar__links__button"
        onClick={handleSignoutUser}
      >
        Signout
      </button>
    </div>
  );
};
