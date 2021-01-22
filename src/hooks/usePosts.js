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
      const response = await API.getPosts(subreddit.value);
      postState.data = response.data.children;
      postState.loading = false;
      postState.error = "";
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
