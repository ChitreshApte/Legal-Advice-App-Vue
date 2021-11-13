<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <router-link class="navbar-brand nav-link" :to="{ name: 'Home' }"
        >Legal Advice</router-link
      >
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'Home' }"
              >Home&nbsp;<font-awesome-icon icon="home"
            /></router-link>
          </li>
        </ul>
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li v-if="showAdminBoard" class="nav-item">
            <router-link to="#" class="nav-link">Admin Board</router-link>
          </li>
          <li v-if="showLegalExpertBoard" class="nav-item">
            <router-link to="#" class="nav-link"
              >Legal Expert Board</router-link
            >
          </li>
        </ul>

        <ul v-if="!currentUser" class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'Login' }"
              ><font-awesome-icon icon="sign-in-alt" />&nbsp;Login</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'Signup' }"
              ><font-awesome-icon icon="user-plus" />&nbsp;Signup</router-link
            >
          </li>
        </ul>

        <div v-if="currentUser" class="navbar-nav ml-auto">
          <li class="nav-item">
            <router-link to="/profile" class="nav-link">
              <font-awesome-icon icon="user" />&nbsp;
              {{ currentUser.username }}
            </router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" @click.prevent="logOut" id="logOutLink">
              <font-awesome-icon icon="sign-out-alt" />&nbsp;Logout
            </a>
          </li>
        </div>
      </div>
    </div>
  </nav>
  <router-view />
</template>

<script>
export default {
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    showAdminBoard() {
      if (this.currentUser && this.currentUser["roles"]) {
        return this.currentUser["roles"].includes("ROLE_ADMIN");
      }

      return false;
    },
    showLegalExpertBoard() {
      if (this.currentUser && this.currentUser["roles"]) {
        return this.currentUser["roles"].includes("ROLE_LEGALEXPERT");
      }

      return false;
    },
  },
  methods: {
    logOut() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/login");
    },
  },
  mounted() {
    //this will update the list of legal experts that we have
    this.$store.dispatch("user/updateLegalExperts");
    // for (const key in this.$store.state.user) {
    //   console.log(`${key}: ${this.$store.state.user[key]}`);
    // }
  },
};
</script>

<style>
* {
  font-family: "Raleway", sans-serif;
}
#logOutLink {
  cursor: pointer;
}
</style>
