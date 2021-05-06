/* eslint-disable react/prop-types */ 
import "../styles/styles.scss";
import { SWRConfig } from 'swr';

const MyApp = ({ Component, pageProps }) => {
  
  return     (
  <SWRConfig 
    value={{
      fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
    }}
  >
    <Component {...pageProps} />;
  </SWRConfig>
  )
};

export default MyApp;
