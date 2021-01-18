<template>
  <main class="container main-container">
    <div class="progress" v-if="postsState.loading">
      <div class="indeterminate"></div>
    </div>
    <div class="card red  darken-1" v-if="postsState.error">
      <div class="card-content white-text">
        <span class="card-title">{{ postsState.error }}</span>
      </div>
    </div>

    <div v-for="post in posts" :key="post.id">
      <div class="card post-card">
        <div class="card-title">
          <blockquote>{{ post.title }}</blockquote>
        </div>
        <div class="card-image" v-if="!post.is_video">
          <img class="responsive-image" :src="post.url" />
        </div>
        <div class="card-stacked">
          <div class="card-action">
            <a
              target="_blank"
              class="lowercase truncate blue-text"
              :href="`https://reddit.com${post.permalink}`"
              >https://reddit.com{{ post.permalink }}</a
            >
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { computed } from "vue";
import usePosts from "@/hooks/usePosts.js";
export default {
  name: "Main",
  setup() {
    const postsState = usePosts("all");
    const posts = computed(() => postsState.data.map((child) => child.data));

    // const isImage = computed(() =>
    //   this.url.match(/bmp|webp|png|jpg|jpeg|gif$/)
    // );
    //   const isVideo = computed(
    //   () => (post.secure_media && post.secure_media.reddit_video)
    //     || post.url.match(/mp4|gifv|mkv|mov|webm$/),
    // );
    return {
      posts,
      postsState,

      // isVideo
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
.post-card {
  margin: 15px auto;
  max-width: 500px;
}
.lowercase {
  text-transform: none !important;
}
.card-title blockquote {
  margin: 0;
}
</style>
