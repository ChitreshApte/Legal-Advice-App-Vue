<template>
  <div class="container query-form profile" v-if="currentLoggedUser">
    <div class="profileHead">
      <h2 class="profileTitle">Ask a query</h2>
      <img
        src="https://www.practiceportuguese.com/wp-content/uploads/2020/06/asking-questions-800x534.jpg"
      />
    </div>

    <div class="messageBox">
      <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label"
          >Title (relevant to your case)</label
        >
        <input
          type="text"
          class="form-control"
          id="exampleFormControlInput1"
          v-model="title"
        />
      </div>

      <div class="mb-3">
        <label for="exampleFormControlInput3" class="form-label"
          >Select the domain of your case</label
        >
        <select
          id="exampleFormControlInput3"
          class="form-control"
          aria-label="Default select example"
          v-model="caseDomain"
        >
          <option value="Corporate Law">Corporate Law</option>
          <option value="Constitutional Law">Constitutional Law</option>
          <option value="Criminal Law">Criminal Law</option>
          <option value="Employment Law">Employment Law</option>
          <option value="Environmental Law">Environmental Law</option>
          <option value="Family Law">Family Law</option>
          <option value="Human Rights Law">Human Rights Law</option>
          <option value="Intellectual Property Law">
            Intellectual Property Law
          </option>
          <option value="Property Law">Property Law</option>
          <option value="Securities Law">Securities Law</option>
          <option value="Tax Law">Tax Law</option>
          <option value="Technology Law">Technology Law</option>
          <option value="Media and Entertainment Law">
            Media and Entertainment Law
          </option>
          <option value="Energy Law">Energy Law</option>
        </select>
      </div>

      <div class="mb-3">
        <label for="exampleFormControlInput2" class="form-label"
          >Email address (visible only to legal experts)</label
        >
        <input
          type="email"
          class="form-control"
          id="exampleFormControlInput2"
          placeholder="name@example.com"
          v-model="email"
        />
      </div>

      <div class="mb-3">
        <label for="exampleFormControlTextarea1" class="form-label"
          >Explain your case details</label
        >
        <textarea
          class="form-control"
          id="exampleFormControlTextarea1"
          rows="15"
          v-model="caseDetails"
        ></textarea>
      </div>

      <button
        type="button"
        class="btn btn-success post-query"
        @click="postQuery"
      >
        Post
      </button>
    </div>
  </div>
</template>

<script>
import QueryService from "../services/query.service";

export default {
  name: "AskAQuery",
  data() {
    return {
      title: "",
      caseDomain: "Corporate Law",
      email: "",
      caseDetails: "",
    };
  },
  computed: {
    currentUser() {
      let currentUserId = this.$store.state.auth.user.id;
      return this.$store.state.user.users.filter(
        (user) => user.id === currentUserId
      )[0];
    },
    currentLoggedUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    postQuery() {
      //validation of message
      if (this.caseDetails.length < 100) {
        alert("Case Details needs to be atleast 100 characters!!");
        return;
      }

      //write the logic here for sending the messages
      const today = new Date();
      const date =
        today.getDate() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getFullYear();
      const time =
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

      //this is the details of date and time in string format
      const dateTime = date + " " + time;

      const newQuery = {
        poster: this.currentLoggedUser.id,
        title: this.title,
        domain: this.caseDomain,
        posterEmail: this.email,
        queryDetails: this.caseDetails,
        dateTime: dateTime,
      };

      //After adding the new message, update the store to reflect the messages
      QueryService.addNewQuery(newQuery);

      this.title = "";
      this.caseDomain = "Corporate Law";
      this.email = "";
      this.caseDetails = "";
      alert("Query sent successfully!!");

      setTimeout(() => this.$store.dispatch("queries/updateQueries"), 1000);
    },
  },
  mounted() {
    //if a user is not logged in we are directing to login page
    //this is important because this page can be used to send a personalize message from client to user

    if (!this.$store.state.auth.status.loggedIn) {
      this.$router.push("/login");
    }
  },
};
</script>

<style>
.query-form label {
  font-weight: 700;
}
.form-select {
  margin-bottom: 30px;
}
.post-query {
  margin-top: 20px;
}
</style>
