import axios from "axios";

const API_URL = "http://localhost:8081/api/users/";

class UserService {
  getExperts() {
    return axios.get(API_URL + "experts");
  }
}

export default new UserService();
