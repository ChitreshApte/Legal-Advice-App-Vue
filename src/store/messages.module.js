import MessageService from "../services/message.service";

export const messages = {
  namespaced: true,
  state: () => ({
    messages: [],
  }),
  actions: {
    updateMessages({ commit }) {
      //if the current list is not updated ask it from the API
      MessageService.getAllMessages()
        .then((res) => {
          commit("UPDATE_MESSAGES", res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mutations: {
    UPDATE_MESSAGES(state, payload) {
      state.messages = payload;
    },
  },
};
