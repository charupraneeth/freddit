<template>
  <div class="card subreddit-header" :title="data.display_name_prefixed">
    <div class="card-image">
      <img
        :src="
          data.banner_background_image.split('?')[0] ||
            data.banner_background_image
        "
        :style="{ background: data.primary_color || data.key_color || 'teal' }"
        @load="isImageLoaded = true"
      />
    </div>
    <div class="card-content">
      <div class="title">
        <span class="card-icon"
          ><img
            v-show="isIconLoaded"
            @load="isIconLoaded = true"
            v-if="data.community_icon || data.icon_img"
            :src="
              data.community_icon.split('?')[0] ||
                data.community_icon ||
                data.icon_img
            "
            alt=""
        /></span>
        <span class="card-title ">{{ data.title }}</span>
      </div>
      <p>
        {{ data.public_description }}
      </p>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  name: "SubredditHeader",
  props: ["data"],
  setup() {
    const isImageLoaded = ref(false);
    const isIconLoaded = ref(false);
    return {
      isImageLoaded,
      isIconLoaded,
    };
  },
};
</script>

<style scoped>
.subreddit-header {
  margin: 10px auto;
  max-width: 800px;
}
.card-image {
  max-height: 15vh;
  overflow: hidden;
}
.card-image img {
  min-height: 15vh;
}
.card-icon {
  position: absolute;
  top: 20%;
}
.card-icon img {
  border: 3px solid white;
  border-radius: 50%;
  max-width: 80px;
}
.title {
  /* max-width: 300px; */
  /* display: flex; */
  justify-content: space-between;
  align-items: center;
}
.card-title {
  text-align: center;
  font-weight: bold;
}
@media only screen and (max-width: 760px) {
  .card-icon {
    left: 50%;
    transform: translateX(-50%);
  }
  .card-title {
    text-align: left;
    padding-top: 30px;
  }
}
</style>
