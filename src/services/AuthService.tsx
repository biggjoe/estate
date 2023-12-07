import HttpService from "./HttpService";
//const API_URL = process.env.REACT_APP_SERVER_DOMAIN_API;
class AuthService {
  logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
    localStorage.removeItem("expire_at");
  }
  getCurrentUser() {
    const userJson = localStorage.getItem("user");
    const user = userJson !== null ? JSON.parse(userJson) : {};
    return user;
  }

  isLogged() {
    let usr = this.getCurrentUser();
    if (Object.keys(usr).length === 0) {
      return false;
    } else {
      return true;
    }
  }

  checkSession() {
    return HttpService.getHeader("checkSession");
  }
}
export default new AuthService();
