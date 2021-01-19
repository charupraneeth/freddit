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

    <div v-for="post in posts" :key="post.id">
      <div class="card post-card">
        <div class="card-title">
          <blockquote>{{ post.title }}</blockquote>
        </div>
        <div class="card-image" v-if="!post.is_video && isImage(post.url)">
          <img class="responsive-image" :src="post.url" />
        </div>
        <div class="center">
          <video class="responsive-video" controls v-if="post.is_video">
            <source :src="post.secure_media.reddit_video.fallback_url" />
          </video>
        </div>

        <div class="card-stacked">
          <div class="card-action ">
            <a
              class="lowercase truncate"
              :href="post.url"
              v-if="!post.is_video && !isImage(post.url)"
              >{{ post.url }}</a
            >
            <a
              target="_blank"
              class="lowercase truncate blue-text"
              :href="`https://reddit.com${post.permalink}`"
              >read comments</a
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
    let sr = "javascript";
    const postsState = usePosts(sr);
    const posts = computed(() => postsState.data.map((child) => child.data));

    function isImage(url) {
      return url.match(/bmp|jpg|jpeg|png|webp|svg|pjp|apng|avif|gif$/g);
    }
    return {
      posts,
      postsState,
      isImage,
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
  font-weight: 500;
  font-size: 20px;
}
</style>
