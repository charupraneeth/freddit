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
  <div class="center">
    <p
      class="blue-text"
      @click="loadMorePosts"
      style="cursor:pointer"
      v-if="postsState.after && !postsState.loading"
    >
      load more...
    </p>
  </div>
</template>

<script>
import API from "@/lib/API";
import SubredditName from "@/store/state";
import RedditPost from "@/components/RedditPost.vue";
import { computed, watch } from "vue";
import usePosts from "@/hooks/usePosts.js";
export default {
  name: "Subreddit",
  components: {
    RedditPost,
  },
  props: ["slug"],

  setup(props) {
    watch(
      () => props.slug,
      () => {
        if (!props.slug) return;
        SubredditName.value = props.slug;
      },
      { immediate: true }
    );
    const postsState = usePosts(SubredditName);
    const posts = computed(() => postsState.data.map((child) => child.data));
    // const morePosts = ref([]);
    async function loadMorePosts() {
      console.log(postsState);
      const morePosts = await API.getPosts(
        SubredditName.value,
        postsState.after
      );
      postsState.data.push(...morePosts.data.children);
      postsState.after = morePosts.data.after;
      // console.log(morePosts.data.children);
    }
    return {
      postsState,
      posts,
      loadMorePosts,
    };
  },
};
</script>

<style></style>
