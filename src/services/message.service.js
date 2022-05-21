import axios from "axios";

const API_URL = "http://localhost:8081/api/messages/";

class MessageService {
  addNewMessage(msg) {
    return axios.post(API_URL, msg);
  }
  myMessages(id) {
    return axios.get(API_URL + id);
  }
  getAllMessages() {
    return axios.get(API_URL);
  }
}

export default new MessageService();
