import axios from "axios";
import authHeader from "./AuthHeaders";
import AuthService from "./AuthService";

const API_URL = process.env.REACT_APP_SERVER_DOMAIN_API;
type headerType = {
  Authorization?: string;
  Bearer?: string;
};
class HttpService {
  auh: headerType = authHeader();

  post(data: any, endpoint: string) {
    return axios.post(API_URL + endpoint, data).then((response) => {
      return response.data;
    });
  }
  get(endpoint: string) {
    return axios.post(API_URL + endpoint).then((response) => {
      return response.data;
    });
  }
  postHeader(endpoint: string, data: any) {
    const hx = { headers: this.auh };
    console.log("::::::::hx", hx);
    return axios.post(API_URL + endpoint, data, hx).then((response) => {
      return response.data;
    });
  }
  postForm(endpoint: string, data: any) {
    const obh = { "content-type": "multipart/form-data" };
    return axios
      .post(API_URL + endpoint, data, { headers: obh })
      .then((response) => {
        return response.data;
      });
  }
  postFormHeader(endpoint: string, data: any) {
    const objh = { "content-type": "multipart/form-data" };
    const hrs = { ...this.auh, ...objh };

    console.log(hrs);
    return axios
      .post(API_URL + endpoint, data, { headers: hrs })
      .then((response) => {
        return response.data;
      });
  }
  getHeader(endpoint: string) {
    return axios
      .get(API_URL + endpoint, { headers: this.auh })
      .then((response) => {
        let resp = response.data;
        return resp;
      });
  }
  refreshUser() {
    const objh = { "content-type": "multipart/form-data" };
    const hrs = { ...this.auh, ...objh };
    const usr = AuthService.getCurrentUser();
    return axios
      .post(
        API_URL + "login",
        { action: "refreshUser", email: usr.email },
        { headers: hrs }
      )
      .then((response) => {
        let rsp = response.data;
        console.log(rsp);
        let usr = JSON.stringify(rsp);
        localStorage.setItem("user", usr);
      });
  }

  getSettings() {
    const objh = { "content-type": "multipart/form-data" };
    const hrs = { ...this.auh, ...objh };
    console.log(hrs);
    return axios
      .post(API_URL + "/general", { mode: "set-settings" }, { headers: hrs })
      .then((response) => {
        return response.data;
      });
  }
}
export default new HttpService();
