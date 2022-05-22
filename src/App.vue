<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <router-link class="navbar-brand nav-link" :to="{ name: 'Home' }">
        <img class="brand-logo" src="../src/assets/LA.png" />
        Legal Advice</router-link
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
  <footer>
    <div class="row">
      <div class="col span-1-of-2">
        <ul class="footer-nav">
          <li><a href="#">About Us</a></li>
          <li><a href="#">Blog</a></li>
          <li><a href="#">Press</a></li>
          <li><a href="#">iOS App</a></li>
          <li><a href="#">Android App</a></li>
        </ul>
      </div>
      <div class="col span-1-of-2">
        <ul class="social-links">
          <li>
            <a href="#"><ion-icon name="logo-facebook" v-pre></ion-icon></a>
          </li>
          <li>
            <a href="#"><ion-icon name="logo-twitter" v-pre></ion-icon></a>
          </li>
          <li>
            <a href="#"><ion-icon name="logo-instagram" v-pre></ion-icon></a>
          </li>
          <li>
            <a href="#"><ion-icon name="logo-google" v-pre></ion-icon></a>
          </li>
        </ul>
      </div>
      <div class="row">
        <p>Copyright &copy; 2022 by Chitresh Apte</p>
      </div>
    </div>
  </footer>
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
    this.$store.dispatch("user/updateUsers");
    this.$store.dispatch("messages/updateMessages");
    this.$store.dispatch("queries/updateQueries");
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
.brand-logo {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
}
footer {
  background-color: #333;
  font-size: 15px;
  margin-top: 40px;
}

footer .row {
  margin: 0;
}

.footer-nav {
  list-style: none;
  padding: 50px 0 80px 0;
  margin-left: 20px;
  float: left;
}

.social-links {
  list-style: none;
  padding: 50px 0 80px 0;
  margin-right: 20px;
  float: right;
}

.footer-nav li,
.social-links li {
  display: inline-block;
  margin-right: 20px;
}

.footer-nav li:last-child,
.social-links li::last-child {
  margin-right: 0;
}

.footer-nav li a:link,
.footer-nav li a:visited {
  text-decoration: none;
  border: 0;
  color: #888;
  transition: color 0.2s;
}

.footer-nav li a:hover,
.footer-nav li a:active {
  color: #ddd;
}

.social-links li a:link,
.social-links li a:visited {
  text-decoration: none;
  border: 0;
  color: #888;
  transition: color 0.2s;
  font-size: 150%;
}

ion-icon[name="logo-facebook"],
ion-icon[name="logo-twitter"],
ion-icon[name="logo-google"],
ion-icon[name="logo-instagram"] {
  transition: color 0.2s;
}

ion-icon[name="logo-facebook"]:hover,
ion-icon[name="logo-facebook"]:active {
  color: #1877f2;
}

ion-icon[name="logo-twitter"]:hover,
ion-icon[name="logo-twitter"]:active {
  color: #1da1f2;
}

ion-icon[name="logo-google"]:hover,
ion-icon[name="logo-google"]:active {
  color: #ea4335;
}

ion-icon[name="logo-instagram"]:hover,
ion-icon[name="logo-instagram"]:active {
  color: #c32aa3;
}

footer p {
  color: #888;
  margin-top: 30px;
  padding-bottom: 5px;
  text-align: center;
}
</style>
