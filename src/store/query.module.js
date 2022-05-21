import QueryService from "../services/query.service";

export const queries = {
  namespaced: true,
  state: () => ({
    queries: [],
  }),
  actions: {
    updateQueries({ commit }) {
      //if the current list is not updated ask it from the API
      QueryService.getAllQueries()
        .then((res) => {
          commit("UPDATE_QUERIES", res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mutations: {
    UPDATE_QUERIES(state, payload) {
      state.queries = payload;
    },
  },
};
