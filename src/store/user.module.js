import UserService from "../services/user.service";

export const user = {
  namespaced: true,
  state: () => ({
    legalExperts: [],
  }),
  actions: {
    updateLegalExperts({ commit }) {
      //if the current list is not updated ask it from the API
      UserService.getExperts()
        .then((res) => {
          commit("UPDATE_LEGAL_EXPERTS", res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mutations: {
    UPDATE_LEGAL_EXPERTS(state, payload) {
      state.legalExperts = payload;
    },
  },
};
