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
          >read comments</a
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
export default {
  name: "RedditPost",
  props: ["post"],
  setup() {
    function isImage(url) {
      return url.match(/bmp|jpg|jpeg|png|webp|svg|pjp|apng|avif|gif$/g);
    }
    return {
      isImage,
    };
  },
};
</script>

<style>
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
