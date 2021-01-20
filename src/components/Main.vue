<template>
  <main class="container main-container">
    <div class="progress blue lighten-3" v-if="postsState.loading">
      <div class="indeterminate orange"></div>
    </div>
    <div class="card red  darken-1" v-if="postsState.error">
      <div class="card-content white-text">
        <span class="card-title">{{ postsState.error }}</span>
      </div>
    </div>

    <Subreddit :posts="posts" />
  </main>
</template>

<script>
import { computed } from "vue";
import usePosts from "@/hooks/usePosts.js";
import Subreddit from "./Subreddit.vue";
export default {
  name: "Main",
  components: {
    Subreddit,
  },
  setup() {
    let sr = "all";
    const postsState = usePosts(sr);
    const posts = computed(() => postsState.data.map((child) => child.data));

    return {
      posts,
      postsState,
    };
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
