<template>
  <div
    style="display:flex;justify-content:space-between;align-items:center;margin:0 10px"
  >
    <a href="/" class="deep-orange-text"><h4>Freddit</h4></a>
    <i
      style="cursor:pointer"
      @click="isInfoShow = true"
      class="material-icons blue-text"
      >info</i
    >
  </div>
  <a id="top"></a>
  <nav class=" deep-orange lighten-2">
    <div class="nav-wrapper">
      <form @submit.prevent="searchSubreddit">
        <div class="input-field">
          <input
            v-model="searchTerm"
            ref="autocomplete"
            id="search"
            type="search"
            autocomplete="off"
            required
          />
          <label class="label-icon search-icon flex" for="search"
            ><i class="material-icons  blue-grey-text text-darken-4">search</i>
            <span class="blue-grey-text text-darken-4">r/</span>
          </label>
          <i
            class="material-icons  blue-grey-text text-darken-4"
            @click="searchTerm = ''"
            >close</i
          >
        </div>
      </form>
    </div>
  </nav>
</template>

<script>
import isInfoShow from "@/store/infoState";
import { useRouter } from "vue-router";
import { ref, onMounted, watch } from "vue";
// import SubredditName from "@/store/state";
import API from "@/lib/API";
import M from "materialize-css";
export default {
  name: "Navbar",
  setup() {
    const autocomplete = ref(null);
    const searchTerm = ref("");
    const router = useRouter();
    let instance;
    function searchSubreddit() {
      instance.close();
      autocomplete.value.blur();
      router.push({
        name: "SearchSubreddit",
        params: {
          slug: autocomplete.value.value,
        },
      });
      // console.log(searchTerm.value, );
    }

    onMounted(() => {
      async function getSubreddits() {
        if (searchTerm.value.length < 3) return;
        const response = await API.getSubreddits({
          q: searchTerm.value,
          type: "sr",
        });
        const searchTerms = response.data.children.reduce((acc, child) => {
          acc[child.data.display_name] = null;
          return acc;
        }, {});
        instance.updateData(searchTerms);
        instance.open();
      }
      instance = M.Autocomplete.init(autocomplete.value, {
        data: {},
        onAutocomplete: () => {
          // SubredditName.value = term;
          searchSubreddit();
          autocomplete.value.blur();
        },
      });
      let debounceTimer;
      watch(
        () => searchTerm.value,
        () => {
          clearTimeout(debounceTimer);
          debounceTimer = setTimeout(async () => {
            getSubreddits();
          }, 100);
        },
        { immediate: true }
      );
    });

    return {
      autocomplete,
      searchTerm,
      searchSubreddit,
      isInfoShow,
    };
  },
};
</script>

<style scoped>
.search-icon {
  padding: 0 20px;
  transform: none !important;
}
.flex {
  display: flex;
}
.flex span {
  display: inline-block;
  margin-left: 3px;
}
/* .drop-down-content {
  display: none;
} */
</style>
