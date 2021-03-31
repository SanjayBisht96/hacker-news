import { useEffect } from "react";
import axios from "axios";

const HomePage = () => {
  // TESTING
  
  // useEffect(() => {
  //   axios({
  //     method: "get",
  //     url: `/api/routes/user/auth/login`,
  //   })
  //     .then((response) => {
  //       console.log(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  return <h1 className="heading-main">Started with the APIs</h1>;
};

export default HomePage;
