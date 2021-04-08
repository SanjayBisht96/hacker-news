import React from "react";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <a href="/" className="navbar__logo__link">Hacker News</a>
      </div>
      <div className="navbar__links">
        <a href="/post" className="navbar__links__item">
          Create Post
        </a>
        <a href="/job" className="navbar__links__item">
          Create Job Posting
        </a>
        <a href="#" className="navbar__links__item">
          Ask HN
        </a>
        <a href="/auth">
          <button className="btn btn-sm navbar__links__button">Login</button>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
