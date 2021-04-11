/* eslint-disable react/prop-types */ 
import "../styles/styles.scss";
import "../styles/global.css";

const MyApp = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default MyApp;
