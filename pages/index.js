import { useEffect } from "react";
import axios from "axios";
import GoogleLogin from "react-google-login";
import Navbar from "../components/layouts/Navbar";

const HomePage = () => {
  // TESTING

  useEffect(() => {
    // console.log(process.env.GOOGLE_AUTH_CLIENT_ID);
  }, []);

  const responseGoogle = (payload) => {
    console.log(payload);
  };

  return (
    <main className="homepage">
      <Navbar />

      <section className="homepage__allposts">
        <h1>All Posts</h1>
      </section>
    </main>
  );
};

export default HomePage;
