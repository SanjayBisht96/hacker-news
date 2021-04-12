import React from "react";
import Navbar from "../../components/layouts/Navbar";

const AdminDashoard = () => {
  return (
    <main className="admindashboard">
      <Navbar />

      <section className="admindashboard__allposts">
        <h1>Admin Dashboard</h1>
      </section>
    </main>
  );
};

export default AdminDashoard;
