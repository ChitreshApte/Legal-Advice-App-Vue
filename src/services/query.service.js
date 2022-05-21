import axios from "axios";

const API_URL = "http://localhost:8081/api/query/";

class QueryService {
  addNewQuery(query) {
    return axios.post(API_URL, query);
  }
  getAllQueries() {
    return axios.get(API_URL);
  }
}

export default new QueryService();
