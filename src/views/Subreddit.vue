<template>
  <div class="progress blue lighten-3" v-show="postsState.loading">
    <div class="indeterminate orange"></div>
  </div>
  <div class="card red  darken-1" v-if="postsState.error">
    <div class="card-content white-text">
      <span class="card-title">{{ postsState.error }}</span>
    </div>
  </div>
  <SubredditHeader
    v-if="postsState.headerData.title"
    :data="postsState.headerData"
  />
  <div v-for="post in posts" :key="post.id">
    <RedditPost :post="post" />
  </div>
  <div class="center">
    <p
      class="blue-text"
      @click="loadMorePosts"
      style="cursor:pointer"
      v-if="
        postsState.after && !postsState.error && postsLength != posts.length
      "
    >
      load more...
    </p>
  </div>
  <div
    class="progress blue lighten-3"
    v-show="postsState.loading && postsLength"
  >
    <div class="indeterminate orange"></div>
  </div>
</template>

<script>
import API from "@/lib/API";
import SubredditName from "@/store/state";
import RedditPost from "@/components/RedditPost.vue";
import SubredditHeader from "@/components/SubredditHeader.vue";
import { computed, watch, ref } from "vue";
import usePosts from "@/hooks/usePosts.js";
export default {
  name: "Subreddit",
  components: {
    RedditPost,
    SubredditHeader,
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
    // const headerData = useHeader(SubredditName)

    const postsState = usePosts(SubredditName);
    const posts = computed(() => postsState.data.map((child) => child.data));
    const postsLength = ref(0);
    async function loadMorePosts() {
      postsState.loading = true;
      console.log(postsLength.value);
      postsLength.value = posts.value.length;
      const morePosts = await API.getPosts(
        SubredditName.value,
        postsState.after
      );
      postsState.data.push(...morePosts.data.children);
      postsState.after = morePosts.data.after;
      console.log(postsLength.value);
      postsState.loading = false;
      // console.log(morePosts.data.children);
    }
    // function bottomVisible() {
    //   const scrollY = window.scrollY;
    //   const visible = document.documentElement.clientHeight;
    //   const pageHeight = document.documentElement.scrollHeight + 100;
    //   const bottomOfPage = visible + scrollY + 100 >= pageHeight;
    //   // console.log(
    //   //   `visible : ${visible}, scrollY : ${scrollY},pageHeight:${pageHeight}`
    //   // );
    //   return bottomOfPage || pageHeight < visible;
    // }
    // onMounted(() => {
    //   window.addEventListener("scroll", async () => {
    //     bottom.value = bottomVisible();
    //     console.log(bottom.value);
    //     if (bottom.value) loadMorePosts();
    //   });
    // });
    return {
      postsState,
      posts,
      loadMorePosts,
      postsLength,
    };
  },
};
</script>

<style></style>
