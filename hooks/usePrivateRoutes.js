import { useEffect } from "react";
import useAuth from 'hooks/useAuth';

const usePrivateRoutes = () => {
  useEffect(() => {
    const isVerified = useAuth() !== undefined;

    if (!isVerified) window.location = "/";
  }, []);
};

export default usePrivateRoutes;
