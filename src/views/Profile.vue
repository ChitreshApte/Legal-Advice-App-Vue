<template>
  <ProfileLegalExpert v-if="isLegalExpert" />
  <ProfileUser v-else />
</template>

<script>
import ProfileUser from "../components/ProfileUser.vue";
import ProfileLegalExpert from "../components/ProfileLegalExpert.vue";

export default {
  name: "Profile",
  components: {
    ProfileUser,
    ProfileLegalExpert,
  },
  computed: {
    isLegalExpert() {
      //   for (const key in this.$store.state.auth.user) {
      //     console.log(`${key}: ${this.$store.state.auth.user[key]}`);
      //   }
      if (!this.currentUser) return;
      return this.$store.state.auth.user.roles.includes("ROLE_LEGALEXPERT");
    },
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
