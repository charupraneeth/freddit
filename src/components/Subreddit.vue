<template>
  <div class="progress blue lighten-3" v-show="postsState.loading">
    <div class="indeterminate orange"></div>
  </div>
  <div class="card red  darken-1" v-if="postsState.error">
    <div class="card-content white-text">
      <span class="card-title">{{ postsState.error }}</span>
    </div>
  </div>
  <div v-for="post in posts" :key="post.id">
    <RedditPost :post="post" />
  </div>
</template>

<script>
import SubredditName from "@/store/state";
import RedditPost from "@/components/RedditPost.vue";
import { computed } from "vue";
import usePosts from "@/hooks/usePosts.js";
export default {
  name: "Subreddit",
  components: {
    RedditPost,
  },

  setup() {
    const postsState = usePosts(SubredditName);
    const posts = computed(() => postsState.data.map((child) => child.data));

    return {
      postsState,
      posts,
    };
  },
};
</script>

<style></style>
