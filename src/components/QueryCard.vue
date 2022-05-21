<template>
  <div class="card expertCard">
    <img :src="imgSrc" class="card-img-top" :alt="query.id" />
    <div class="card-body">
      <h5 class="card-title">{{ query.title }}</h5>
      <span class="badge bg-primary">{{ query.domain }}</span>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">{{ query.queryDetails }}</li>
    </ul>
    <div class="card-body">
      <router-link
        class="card-link"
        :to="{ name: 'ShowQuery', params: { id: query.queryId } }"
        >Explore</router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "QueryCard",
  props: ["query"],
  data() {
    return {
      imgSrc:
        "https://images.unsplash.com/photo-1423592707957-3b212afa6733?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332",
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
