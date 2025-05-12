import apiService from "./http-common";
import { tokenService, userService } from "../storageService";
import { http } from "./http";
const auth = {
  async signIn(payload) {
    try {
      const response = await http.request(payload);
      if (response.access_token) {
        tokenService.saveToken(response.access_token);
        apiService.setHeader();
        // console.log("token", response.access_token);
        return {
          isError: false,
          token: response.access_token,
        };
      }
    } catch (err) {
      return { isError: true, error: err };
    }
  },
  signOut() {
    apiService.removeHeader();
    tokenService.removeToken();
    userService.removeUser();
  },
};
export default auth;
