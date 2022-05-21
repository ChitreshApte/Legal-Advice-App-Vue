<template>
  <div class="card expertCard">
    <img :src="imgSrc" class="card-img-top" :alt="user.username" />
    <div class="card-body">
      <h5 class="card-title">{{ user.username }}</h5>
      <span class="badge bg-primary">{{ user.tagline }}</span>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">{{ user.experience }}</li>
      <li class="list-group-item">
        <i class="bi bi-briefcase-fill" style="color: brown"></i>
        &nbsp;{{ user.domainSpecialization }}
      </li>
      <li class="list-group-item">
        <i class="bi bi-geo-alt-fill" style="color: green"></i>
        {{ user.city }}, {{ user.state }}, {{ user.country }}
      </li>
    </ul>
    <div class="card-body">
      <a href="#" class="card-link">Book a meet</a>
      <router-link
        class="card-link"
        :to="{ name: 'ProfileLegalExpertForOthers', params: { id: user.id } }"
        >See Profile</router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileCard",
  props: ["user"],
  data() {
    return {
      imgSrc: "https://picsum.photos/seed/" + Math.random() + "/200/150",
    };
  },
};
</script>

<style>
.card-title {
  font-weight: 700;
}
.expertCard {
  width: 18rem;
  font-weight: 600;
}
</style>
