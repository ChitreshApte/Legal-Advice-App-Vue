<template>
  <div class="display-query container" v-if="currentQuery">
    <div class="query-title profileHead">
      <h2 class="profileTitle">{{ currentQuery.title }}</h2>
      <div>
        <span class="badge rounded-pill bg-primary">{{
          currentQuery.domain
        }}</span>
      </div>
    </div>
    <div class="query-specs">
      <div class="query-email" v-if="isUserExpert">
        <div class="qa">
          <h3 class="info">Author Email:&nbsp;</h3>
          <h3 class="info-answer">{{ currentQuery.posterEmail }}</h3>
        </div>
      </div>
      <div class="qa">
        <h3 class="info">Posted on:&nbsp;</h3>
        <h3 class="info-answer">
          <span class="badge bg-success">{{ currentQuery.dateTime }}</span>
        </h3>
      </div>
    </div>
    <div class="query-details">
      <h4>
        <em>{{ currentQuery.queryDetails }}</em>
      </h4>
    </div>

    <div class="messageBox" v-if="isUserExpert">
      <h4>
        Hello expert {{ currentLoggedUser.username }}, would you like to comment
        on this post?
      </h4>
      <textarea rows="2" cols="100" v-model="typedComment"></textarea>
      <br />
      <button class="btn btn-success" @click="sendMessage">
        Add Comment &nbsp;<i class="bi bi-send-fill"></i>
      </button>
    </div>

    <div v-if="getCommentsOnThisPost.length !== 0">
      <div class="past-comments">
        <h3 class="past-comments-title">Past Comments</h3>
      </div>
      <div v-for="msg in getCommentsOnThisPost" :key="msg.id" class="msg-body">
        <div class="message-tip">
          <span class="badge rounded-pill bg-primary">{{
            $store.state.user.users.filter((usr) => usr.id === msg.sender)[0]
              .username
          }}</span>
          &nbsp; &nbsp; &nbsp;
          <span class="badge rounded-pill bg-dark">{{ msg.dateTime }}</span>
        </div>
        {{ msg.message }}
      </div>
    </div>
  </div>
</template>

<script>
import MessageService from "../services/message.service";

export default {
  name: "ShowQuery",
  data() {
    return {
      typedComment: "",
    };
  },
  computed: {
    isUserExpert() {
      return this.currentLoggedUser.roles.includes("ROLE_LEGALEXPERT");
    },
    currentQuery() {
      const query_id = parseInt(this.$route.params.id);
      return this.$store.state.queries.queries.filter(
        (query) => query.queryId === query_id
      )[0];
    },
    currentLoggedUser() {
      return this.$store.state.auth.user;
    },
    //this will filter all the comments that have been made on this post
    getCommentsOnThisPost() {
      const allMessages = this.$store.state.messages.messages;
      const answer = allMessages.filter((msg) => {
        if (msg.receiver.toString() !== this.$route.params.id) return false;
        let messageSender = msg.sender;
        let userWhoSent = this.$store.state.user.users.filter((user) => {
          return user.id === messageSender;
        })[0];
        return userWhoSent.roles[0].name === "ROLE_LEGALEXPERT";
      });
      console.log(answer);
      return answer;
    },
  },
  methods: {
    sendMessage() {
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
        receiver: this.$route.params.id,
        message: this.typedComment,
      };

      //After adding the new message, update the store to reflect the messages
      MessageService.addNewMessage(newMessage);

      this.typedComment = "";
      alert("Comment added successfully!!");

      setTimeout(() => this.$store.dispatch("messages/updateMessages"), 1000);
    },
  },
};
</script>

<style>
.past-comments {
  margin-top: 20px;
}
.query-specs {
  margin: 50px 0;
}
.query-details {
  border: 1px solid black;
  border-radius: 10px;
  padding: 30px;
  height: 500px;
}
.past-comments-title {
  padding-bottom: 5px;
  border-bottom: 1px solid grey;
}
</style>
