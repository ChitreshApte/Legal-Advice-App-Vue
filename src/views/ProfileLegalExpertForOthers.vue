<template>
  <div class="container profile" v-if="currentExpert && currentLoggedUser">
    <div class="profileHead">
      <h2 class="profileTitle">{{ currentExpert.username }}</h2>
      <div>
        <span class="badge rounded-pill bg-primary">{{
          currentExpert.tagline
        }}</span>
      </div>
      <img src="../assets/lawyer-icon.png" />
    </div>
    <div class="qa">
      <h3 class="info">Name:&nbsp;</h3>
      <h3 class="info-answer">{{ currentExpert.username }}</h3>
    </div>
    <div class="qa">
      <h3 class="info">Profession:&nbsp;</h3>
      <h3 class="info-answer">{{ currentExpert.profession }}</h3>
    </div>
    <div class="qa">
      <h3 class="info">Experience:&nbsp;</h3>
      <h3 class="info-answer">{{ currentExpert.experience }}</h3>
    </div>
    <div class="qa">
      <h3 class="info">Expertise domain:&nbsp;</h3>
      <h3 class="info-answer">{{ currentExpert.domainSpecialization }}</h3>
    </div>
    <div class="qa">
      <h3 class="info">Target Clients:&nbsp;</h3>
      <h3 class="info-answer">{{ currentExpert.targetClients }}</h3>
    </div>
    <div class="qa">
      <h3 class="info">Location:&nbsp;</h3>
      <h3 class="info-answer">
        {{ currentExpert.city }}, {{ currentExpert.state }},
        {{ currentExpert.country }}
      </h3>
    </div>
    <div class="qa">
      <h3 class="info">Rating:&nbsp;</h3>
      <h3 class="info-answer" style="color: orange">
        <i class="bi bi-star-fill"></i>
        <i class="bi bi-star-fill"></i>
        <i class="bi bi-star-fill"></i>
        <i class="bi bi-star-fill"></i>
        <i class="bi bi-star-half"></i>
      </h3>
    </div>
    <div class="qa">
      <h3 class="info">Queries answered:&nbsp;</h3>
      <h3 class="info-answer">Show here a list of queries answered</h3>
    </div>

    <div class="messageBox">
      <img src="../assets/download.png" />
      <h4>
        Hello {{ currentLoggedUser.username }}, would you like to drop a message
        for {{ currentExpert.username }}?
      </h4>
      <textarea rows="4" cols="100" v-model="typedMessage"></textarea>
      <br />
      <button class="btn btn-success" @click="sendMessage">
        Send &nbsp;<i class="bi bi-send-fill"></i>
      </button>
    </div>
  </div>
</template>

<script>
import MessageService from "../services/message.service";

export default {
  name: "ProfileLegalExpertForOthers",
  data() {
    return {
      typedMessage: "",
    };
  },
  computed: {
    currentExpert() {
      const user_id = parseInt(this.$route.params.id);
      return this.$store.state.user.legalExperts.filter(
        (user) => user.id === user_id
      )[0];
    },
    currentLoggedUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    sendMessage() {
      //validation of message
      if (this.typedMessage.length < 50) {
        alert("Message needs to be atleast 50 characters!!");
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

      const newMessage = {
        dateTime: dateTime,
        sender: this.currentLoggedUser.id,
        receiver: this.currentExpert.id,
        message: this.typedMessage,
      };

      //After adding the new message, update the store to reflect the messages
      MessageService.addNewMessage(newMessage);

      this.typedMessage = "";
      alert("Message sent successfully!!");

      setTimeout(() => this.$store.dispatch("messages/updateMessages"), 1000);
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
.messageBox {
  margin: 50px 0 50px 0;
  padding: 20px;
  border: 6px solid rgb(232, 228, 228);
  box-shadow: 6px 10px #b8b4b4;
}
.messageBox h4 {
  font-size: 20px;
}
.messageBox textarea {
  margin: 10px 0;
}
.profileHead .badge {
  margin-bottom: 20px;
  font-size: 15px;
}
.profileHead {
  text-align: center;
  margin-bottom: 30px;
}
.info {
  font-size: 20px;
  font-weight: 700;
  min-width: 400px;
}
.info-answer {
  font-size: 20px;
  font-weight: 400;
}
.qa {
  display: flex;
  border-bottom: 1px solid rgb(220, 215, 215);
  margin: 5px 0;
}
</style>
