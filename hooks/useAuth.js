const useAuth = () => {
  const userData = localStorage.getItem("data");

  if (userData) {
    const parsedUserData = JSON.parse(userData);

    const id = parsedUserData.id;
    const type = parsedUserData.userType;

    return { id, type };
  }
};

export default useAuth;
