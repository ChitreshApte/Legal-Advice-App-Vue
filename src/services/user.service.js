import axios from "axios";

const API_URL = "http://localhost:8081/api/users/";

class UserService {
  getExperts() {
    return axios.get(API_URL + "experts");
  }

  getUsers() {
    return axios.get(API_URL);
  }
  //   getUserDetails(id) {
  //     return axios.get(API_URL + "user/" + id);
  //   }

  //   getLegalExpertDetails(id) {
  //     return axios.get(API_URL + "expert/" + id);
  //   }
}

export default new UserService();
