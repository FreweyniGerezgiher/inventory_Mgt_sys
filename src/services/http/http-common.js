import axios from "axios";
import { tokenService } from "../storageService";

const apiService = {
  init() {},

  setHeader() {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${tokenService.getToken()}`;
  },

  removeHeader() {
    axios.defaults.headers.common = {};
  },

  request(data) {
    return axios(data);
  },

  mount401Interceptor() {
    this.interceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response.status === 401) {
          console.log("401: unauthorized -- interceptor");

          tokenService.removeToken();
          window.location.replace("/login");
        }
      }
    );
  },
};

export default apiService;
