import { reactive, watch } from "vue";
import API from "@/lib/API";

const postState = reactive({
  loading: true,
  error: "",
  data: [],
  headerData: {},
  after: null,
});
export default function usePosts(subreddit) {
  async function loadData() {
    try {
      postState.loading = true;
      postState.error = "";
      postState.data = [];
      postState.headerData = [];

      const response = await API.getPosts(subreddit.value);
      const headerResponse = await API.getSubredditHeader(subreddit.value);

      postState.headerData = headerResponse ? headerResponse.data : {};
      postState.data = response.data.children;
      postState.after = response.data.after;
    } catch (error) {
      postState.error = error.message || "unable to fetch posts";
      // console.log(error);
    } finally {
      postState.loading = false;
    }
  }
  watch(() => subreddit.value, loadData, { immediate: true });
  return postState;
}
