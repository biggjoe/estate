const AuthHeader = () => {
  const userJson: string | null = localStorage.getItem("user");
  const userToken: string | null = localStorage.getItem("access_token");
  const user =
    userJson !== undefined && userJson !== null ? JSON.parse(userJson) : {};
  const token = userToken ? userToken : "";
  user.accessToken = token;

  const unixTime: any = localStorage.getItem("expire_at");
  const datex = new Date(parseInt(unixTime) * 1000);

  if (user && user.accessToken) {
    return {
      Authorization: "Bearer " + user.accessToken,
    };
  } else {
    return {};
  }
};

export default AuthHeader;
