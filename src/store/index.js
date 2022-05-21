import { createStore } from "vuex";
import { auth } from "./auth.module";
import { user } from "./user.module";
import { messages } from "./messages.module";
import { queries } from "./query.module";

const store = createStore({
  modules: {
    auth,
    user,
    messages,
    queries,
  },
});

export default store;
