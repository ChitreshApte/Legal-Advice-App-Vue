<template>
  <div class="card expertCard">
    <img
      src="../assets/lawyer-profile.jpg"
      class="card-img-top"
      :alt="user.username"
    />
    <div class="card-body">
      <h5 class="card-title">{{ user.username }}</h5>
      <p class="card-text">
        Some quick example text to build on the card title and make up the bulk
        of the card's content.
      </p>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">An item</li>
      <li class="list-group-item">A second item</li>
      <li class="list-group-item">A third item</li>
    </ul>
    <div class="card-body">
      <a href="#" class="card-link">Card link</a>
      <a href="#" class="card-link">Another link</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileCard",
  props: ["user"],
};
</script>

<style>
.expertCard {
  width: 18rem;
}
</style>
