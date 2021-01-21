<template>
  <main class="container main-container">
    <Subreddit />
  </main>
</template>

<script>
import Subreddit from "./Subreddit.vue";
// import SubredditName from "@/store/state";
export default {
  name: "Main",
  components: {
    Subreddit,
  },
  setup() {
    // console.log(SubredditName);
    return {};
  },
};
</script>

<style scoped>
.main-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
