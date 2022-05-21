<template>
  <div class="container profile" v-if="currentUser">
    <div class="profileHead">
      <h2 class="profileTitle">{{ currentUser.username }}</h2>
      <img src="../assets/neutral-avatar.png" />
    </div>
    <div class="qa">
      <h3 class="info">Name:&nbsp;</h3>
      <h3 class="info-answer">{{ currentUser.username }}</h3>
    </div>
    <div class="qa">
      <h3 class="info">Profession:&nbsp;</h3>
      <h3 class="info-answer">{{ currentUser.profession }}</h3>
    </div>
    <div class="qa">
      <h3 class="info">Queries asked:&nbsp;</h3>
      <h3 class="info-answer">Show here a list of queries asked</h3>
    </div>
    <br />

    <button type="button" class="btn btn-primary" @click="askQuery">
      Ask a query
    </button>

    <div class="myInbox" v-if="sentByMe.length || receivedByMe.length">
      <div class="msg-heading">
        Messages Inbox &nbsp;
        <i class="bi bi-chat-square-text-fill" style="color: orange"></i>
      </div>

      <div class="sentByMe" v-if="sentByMe.length">
        <div class="msg-heading-sent">
          Sent &nbsp; <i class="bi bi-send" style="color: blue"></i>
        </div>
        <div v-for="msg in sentByMe" :key="msg.id" class="msg-body">
          <div class="message-tip">
            <span class="badge rounded-pill bg-success">{{
              currentUser.username
            }}</span>
            &nbsp;<i class="bi bi-arrow-right"></i>&nbsp;
            <span class="badge rounded-pill bg-primary">{{
              $store.state.user.users.filter(
                (usr) => usr.id === msg.receiver
              )[0].username
            }}</span>
            &nbsp; &nbsp; &nbsp;
            <span class="badge rounded-pill bg-dark">{{ msg.dateTime }}</span>
          </div>
          {{ msg.message }}
        </div>
      </div>

      <!-- only legalexperts can have this section as normal users will only receive comments on post   -->
      <!-- <div class="recievedByMe" v-if="receivedByMe.length">
        <div class="msg-heading-rec">
          Received &nbsp;
          <i class="bi bi-inboxes-fill" style="color: blue"></i>
        </div>
        <div v-for="msg in receivedByMe" :key="msg.id" class="msg-body">
          <div class="message-tip">
            <span class="badge rounded-pill bg-primary">{{
              $store.state.user.users.filter((usr) => usr.id === msg.sender)[0]
                .username
            }}</span>
            &nbsp;<i class="bi bi-arrow-right"></i>&nbsp;
            <span class="badge rounded-pill bg-success">{{
              currentUser.username
            }}</span>
            &nbsp; &nbsp; &nbsp;
            <span class="badge rounded-pill bg-dark">{{ msg.dateTime }}</span>
          </div>
          {{ msg.message }}
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileUser",
  data() {
    return {
      showQueryPage: false,
    };
  },
  methods: {
    askQuery() {
      this.$router.push("/query");
    },
  },
  computed: {
    currentUser() {
      let currentUserId = this.$store.state.auth.user.id;
      return this.$store.state.user.users.filter(
        (user) => user.id === currentUserId
      )[0];
    },
    sentByMe() {
      return this.$store.state.messages.messages.filter(
        (msg) => msg.sender === this.currentUser.id
      );
    },
    receivedByMe() {
      return this.$store.state.messages.messages.filter(
        (msg) => msg.receiver === this.currentUser.id
      );
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
  height: 150px;
}
.info {
  display: inline;
  max-width: 100px;
}
.info-answer {
  display: inline;
}
.myInbox {
  margin: 50px 0 50px 0;
  padding: 20px;
  border: 6px solid rgb(232, 228, 228);
  box-shadow: 6px 10px #b8b4b4;
}
.msg-heading {
  font-size: 25px;
  margin: 0 auto;
  text-align: center;
}
.msg-heading-sent {
  font-size: 25px;
  margin-bottom: 10px;
}
.msg-heading-rec {
  font-size: 25px;
  margin-bottom: 10px;
}
.message-tip {
  margin-bottom: 10px;
}
.message-tip .badge {
  font-size: 15px;
}
.msg-body {
  border: 1px solid rgb(178, 169, 169);
  border-radius: 10px;
  margin-bottom: 10px;
  padding: 10px;
  font-size: 15px;
  font-weight: 700;
  background-color: cornsilk;
}
</style>
