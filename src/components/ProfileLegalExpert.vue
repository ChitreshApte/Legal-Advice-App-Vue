<template>
  <div class="container profile" v-if="currentUser">
    <div class="profileHead">
      <h2 class="profileTitle">{{ currentUser.username }}</h2>
      <div>
        <span class="badge rounded-pill bg-primary">{{
          currentUser.tagline
        }}</span>
      </div>
      <img src="../assets/lawyer-icon.png" />
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
      <h3 class="info">Experience:&nbsp;</h3>
      <h3 class="info-answer">{{ currentUser.experience }}</h3>
    </div>
    <div class="qa">
      <h3 class="info">Expertise domain:&nbsp;</h3>
      <h3 class="info-answer">{{ currentUser.domainSpecialization }}</h3>
    </div>
    <div class="qa">
      <h3 class="info">Target Clients:&nbsp;</h3>
      <h3 class="info-answer">{{ currentUser.targetClients }}</h3>
    </div>
    <div class="qa">
      <h3 class="info">Location:&nbsp;</h3>
      <h3 class="info-answer">
        {{ currentUser.city }}, {{ currentUser.state }},
        {{ currentUser.country }}
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
    <br />

    <div
      class="myInbox"
      v-if="(sentByMe.length || receivedByMe.length) && currentUser"
    >
      <div class="msg-heading">
        Messages Inbox &nbsp;
        <i class="bi bi-chat-square-text-fill" style="color: orange"></i>
      </div>

      <!-- legal experts cannnot send message to anyone, they can only post comments on queries -->
      <!-- <div class="sentByMe" v-if="sentByMe.length">
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
      </div> -->

      <div class="recievedByMe" v-if="receivedByMe.length">
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
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileLegalExpert",
  computed: {
    currentUser() {
      const user_id = this.$store.state.auth.user.id;
      return this.$store.state.user.legalExperts.filter(
        (user) => user.id === user_id
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
}
.info {
  display: inline;
  max-width: 100px;
}
.info-answer {
  display: inline;
}
</style>
