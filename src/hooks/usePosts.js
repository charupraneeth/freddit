import { reactive, watch } from "vue";
import API from "@/lib/API";

const postState = reactive({
  loading: true,
  error: "",
  data: [],
});
export default function usePosts(subreddit) {
  async function loadData() {
    try {
      postState.loading = true;
      postState.error = "";
      postState.data = [];

      const response = await API.getPosts(subreddit.value);
      postState.data = response.data.children;
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
