<template>
  <div class="home-landing">
    <div class="welcome">
      <h1>Legal Advice</h1>
      <p>Find answers to all your queries</p>
      <button class="myBtn">
        <router-link :to="{ name: 'Signup' }">Register Now</router-link>
      </button>
    </div>
  </div>
  <div v-if="$store.state.user.legalExperts">
    <h3 class="listHeading">Our Experts</h3>
  </div>
  <div class="container wrapper">
    <ProfileCard
      class="experProfile"
      v-for="expert in $store.state.user.legalExperts"
      :key="expert.id"
      :user="expert"
    />
  </div>
</template>

<script>
import ProfileCard from "../components/ProfileCard.vue";
export default {
  name: "Home",
  components: {
    ProfileCard,
  },
};
</script>

<style>
.listHeading {
  font-size: 3em;
  margin: 30px auto;
  border-bottom: 2px solid orange;
  max-width: fit-content;
}
.wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 2em;
  margin: 50px 0;
}
.home-landing {
  padding: 80px;
  background-image: url("../assets/3.jpg");
  height: 91.8vh;
  background-size: cover;
  text-align: center;
}
.welcome {
  padding: 70px;
  max-width: 600px;
  max-height: 600px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
}
.welcome h1 {
  font-size: 80px;
  color: rgb(255, 255, 255);
  font-family: Georgia, "Times New Roman", Times, serif;
}
.welcome p {
  font-size: 30px;
  color: white;
}
.myBtn {
  font-size: 20px;
  background: rgb(73, 76, 224);
  border: none;
  border-radius: 50px;
  padding: 10px 20px;
}
.myBtn:focus {
  outline: none;
  box-shadow: none;
}
.myBtn a,
.myBtn a:hover {
  color: white;
  text-decoration: none;
}
</style>
