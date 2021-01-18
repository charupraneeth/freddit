import { reactive, watch } from "vue";
import API from "@/lib/API";

export default function usePosts(subreddit) {
  const postState = reactive({
    loading: true,
    error: "",
    data: [],
  });
  async function loadData() {
    try {
      const response = await API.getPosts(subreddit);
      postState.data = response.data.children;
      postState.loading = false;
      postState.error = "";
    } catch (error) {
      postState.error = error.message || "unable to fetch posts";
      console.log(error);
    } finally {
      postState.loading = false;
    }
  }
  watch(() => subreddit, loadData, { immediate: true });
  return postState;
}
