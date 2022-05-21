import axios from "axios";

const API_URL = "http://localhost:8081/api/auth/";

class AuthService {
  login(user) {
    return axios
      .post(API_URL + "signin", {
        username: user.username,
        password: user.password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  registerUser(user) {
    return axios.post(API_URL + "signupUser", {
      username: user.username,
      email: user.email,
      password: user.password,
      phoneNumber: user.phoneNumber,
      profession: user.profession,
      description: user.description,
    });
  }
  registerExpert(expert) {
    return axios.post(API_URL + "signupExpert", {
      username: expert.username,
      email: expert.email,
      password: expert.password,
      phoneNumber: expert.phoneNumber,
      profession: expert.profession,
      description: expert.description,
      domainSpecialization: expert.domainSpecialization,
      city: expert.city,
      state: expert.state,
      country: expert.country,
      experience: expert.experience,
      clientProblems: expert.clientProblems,
      targetClients: expert.targetClients,
      tagline: expert.tagline,
      keywords: expert.keywords,
    });
  }
}

export default new AuthService();
