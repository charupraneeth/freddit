<template>
  <div v-for="post in posts" :key="post.id">
    <RedditPost :post="post" />
  </div>
</template>

<script>
import RedditPost from "@/components/RedditPost.vue";
export default {
  name: "Subreddit",
  components: {
    RedditPost,
  },
  props: ["posts"],
};
</script>

<style></style>
