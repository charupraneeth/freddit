<template>
  <div class="card post-card">
    <div class="card-meta">
      <a
        target="_blank"
        :href="`https://reddit.com/${post.subreddit_name_prefixed}`"
        >{{ post.subreddit_name_prefixed }}</a
      >
      <span class="grey-text text-lighten-1 card-meta-author"
        >Posted by
        <a
          target="_blank"
          class="grey-text"
          :href="`https://reddit.com/user/${post.author}`"
          >u/{{ post.author }}</a
        ></span
      >
    </div>
    <div class="card-title">
      <blockquote>{{ post.title }}</blockquote>
    </div>
    <div v-if="post.selftext" class="card-content">
      <p>{{ post.selftext }}</p>
    </div>
    <div class="card-image center" v-if="!post.is_video && isImage(post.url)">
      <div class="preloader-wrapper small " :class="{ active: !isImageLoaded }">
        <div class="spinner-layer spinner-green-only">
          <div class="circle-clipper left">
            <div class="circle"></div>
          </div>
          <div class="gap-patch">
            <div class="circle"></div>
          </div>
          <div class="circle-clipper right">
            <div class="circle"></div>
          </div>
        </div>
      </div>
      <img
        @load="isImageLoaded = true"
        v-show="isImageLoaded"
        class="responsive-image"
        :src="post.url"
      />
    </div>
    <div class="center">
      <video
        @play="handlePlay"
        @pause="handlePause"
        class="responsive-video"
        controls
        v-if="post.is_video"
      >
        <source :src="post.secure_media.reddit_video.fallback_url" />
        <audio
          :src="setAudio(post.secure_media.reddit_video.fallback_url)"
        ></audio>
      </video>
    </div>

    <div class="card-stacked">
      <div class="card-action ">
        <a
          target="_blank"
          class="lowercase truncate"
          :href="post.url"
          v-if="!post.is_video && !isImage(post.url)"
          >{{ post.url }}</a
        >
        <a
          target="_blank"
          class="lowercase truncate blue-text text-lighten-2"
          :href="`https://reddit.com${post.permalink}`"
          >{{ post.num_comments }} comments</a
        >
      </div>
      <div class="card-votes">
        <div class="upvotes">
          <span class="upvotes-number">{{ post.ups }}</span>
          <i class="material-icons">thumb_up</i>
        </div>
        <div class="downvotes">
          <span class="upvotes-number">{{ post.downs }}</span>
          <i class="material-icons">thumb_down</i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  name: "RedditPost",
  props: ["post"],
  setup() {
    function isImage(url) {
      return url.match(/bmp|jpg|jpeg|png|webp|svg|pjp|apng|avif|gif$/g);
    }
    function setAudio(videoUrl) {
      const left = videoUrl.split("DASH")[0];
      const right = videoUrl.split("?")[1];
      const middle = "DASH_audio.mp4";
      return `${left}${middle}?${right}`;
    }
    function handlePlay(event) {
      const videoElement = event.target;
      const audioElement = videoElement.querySelector("audio");
      audioElement.currentTime = videoElement.currentTime;
      audioElement.play();
    }
    function handlePause(event) {
      const videoElement = event.target;
      const audioElement = videoElement.querySelector("audio");
      audioElement.pause();
    }
    const isImageLoaded = ref(false);
    return {
      isImage,
      isImageLoaded,
      setAudio,
      handlePlay,
      handlePause,
    };
  },
};
</script>

<style scoped>
.spinner-layer {
  border-color: orange !important;
}
.post-card {
  margin: 1rem auto !important;
  max-width: 500px;
  word-wrap: break-word;
}
.lowercase {
  text-transform: none !important;
}
.card-title blockquote {
  margin: 0;
  font-weight: 500;
  font-size: 20px;
}
/* .card-image img {
  max-height: 800px;
} */
.card-meta {
  margin-left: 15px;
}
.card-meta-author {
  margin-left: 5px;
}
.card-votes {
  display: flex;
  margin-left: 10px;
}
.upvotes,
.downvotes {
  margin: 0 5px;
  display: flex;
  flex-direction: column-reverse;
  /* justify-content: center; */
  align-items: center;
}
</style>
