<template>
  <div class="container">
    <div class="choiceBox">
      <h2>Welcome to Legal Advice</h2>
      <div class="row align-items-start thumbImages">
        <div
          class="col"
          :class="{ selectedOne: isLegalExpert }"
          @click="toggleExpert"
        >
          <img src="../assets/user.png" />
        </div>
        <div
          class="col"
          :class="{ selectedOne: !isLegalExpert }"
          @click="toggleExpert"
        >
          <img src="../assets/lawyer.png" />
        </div>
      </div>
      <SignupLegalExpert v-if="isLegalExpert" />
      <SignupUser v-else />
    </div>
  </div>
</template>

<script>
import SignupLegalExpert from "../components/SignupLegalExpert.vue";
import SignupUser from "../components/SignupUser.vue";

export default {
  name: "Signup",
  components: {
    SignupLegalExpert,
    SignupUser,
  },
  data() {
    return {
      isLegalExpert: false,
    };
  },
  methods: {
    toggleExpert() {
      this.isLegalExpert = !this.isLegalExpert;
    },
  },
};
</script>

<style>
.choiceBox {
  max-width: 60%;
  margin: 0 auto;
  padding-bottom: 70px;
}
.thumbImages {
  padding-bottom: 70px;
}
.choiceBox h2 {
  text-align: center;
  font-size: 60px;
  margin: 30px 0;
}
.signup h2 {
  text-align: center;
  font-size: 40px;
  margin: 30px 0;
}
.spinner-border {
  margin-left: 10px;
}
div.thumbImages div img {
  height: 300px;
  width: auto;
  border-style: double;
  padding: 15px;
  border-radius: 10px;
}
.selectedOne {
  opacity: 0.4;
}
</style>
