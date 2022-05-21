import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Signup from "../views/Signup.vue";
import Profile from "../views/Profile.vue";
import ProfileLegalExpertForOthers from "../views/ProfileLegalExpertForOthers.vue";
import AskAQuery from "../components/AskAQuery.vue";
import ShowQuery from "../views/ShowQuery.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  {
    //   this will only be used to show the profile of the person who is logeed in to himself
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
  {
    //   this will only be used to show the profile of the person who is logeed in to himself
    path: "/profile/:id",
    name: "ProfileLegalExpertForOthers",
    component: ProfileLegalExpertForOthers,
  },
  {
    path: "/query/show/:id",
    name: "ShowQuery",
    component: ShowQuery,
  },
  {
    path: "/query",
    name: "AskAQuery",
    component: AskAQuery,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
