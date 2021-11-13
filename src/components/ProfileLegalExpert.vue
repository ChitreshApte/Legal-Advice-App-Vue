<template>
  <div class="container profile" v-if="currentUser">
    <div class="profileHead">
      <h2 class="profileTitle">{{ currentUser.username }}</h2>
      <img src="../assets/lawyer-icon.png" />
    </div>
    <h3 class="info">Name:&nbsp;</h3>
    <h3 class="info-answer">{{ currentUser.username }}</h3>
    <br />
    <h3 class="info">Profession:&nbsp;</h3>
    <h3 class="info-answer">{{ currentUser.profession }}</h3>
    <br />
    <h3 class="info">Years of Experience:&nbsp;</h3>
    <h3 class="info-answer">15</h3>
    <br />
    <h3 class="info">Expertise domain:&nbsp;</h3>
    <h3 class="info-answer">Civil law, Criminal law</h3>
    <br />
    <h3 class="info">Rating:&nbsp;</h3>
    <h3 class="info-answer">4.5</h3>
    <br />
    <h3 class="info">Queries answered:&nbsp;</h3>
    <h3 class="info-answer">Show here a list of queries answered</h3>
    <br />
  </div>
</template>

<script>
export default {
  name: "ProfileLegalExpert",
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/login");
    }
  },
};
</script>

<style>
.profile {
  max-width: 60%;
}
.profileTitle {
  font-weight: 400;
  font-style: italic;
  font-size: 300%;
  margin: 20px 0;
}
.profile img {
  margin-bottom: 40px;
}
.info {
  display: inline;
  max-width: 100px;
}
.info-answer {
  display: inline;
}
</style>
