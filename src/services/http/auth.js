import apiService from "./http-common";
import { tokenService, userService } from "../storageService";
import { http } from "./http";
const auth = {
  async signIn(payload) {
    try {
      const response = await http.request(payload);
      if (response.data.accessToken) {
        tokenService.saveToken(response.data.accessToken);
        userService.saveUser(response.data.user);
        apiService.setHeader();
        return {
          isError: false,
          token: response.data.accessToken,
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
