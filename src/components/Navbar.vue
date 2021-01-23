<template>
  <nav class="container deep-orange lighten-2">
    <div class="nav-wrapper">
      <form>
        <div class="input-field">
          <input
            v-model="searchTerm"
            ref="autocomplete"
            id="search"
            type="search"
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
import { ref, onMounted, watch } from "vue";
import SubredditName from "@/store/state";
import API from "@/lib/API";
import M from "materialize-css";
export default {
  name: "Navbar",
  setup() {
    const autocomplete = ref(null);
    const searchTerm = ref("");
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
      const instance = M.Autocomplete.init(autocomplete.value, {
        data: {},
        onAutocomplete: (term) => {
          SubredditName.value = term;
        },
      });
      let debounceTimer;
      watch(
        () => searchTerm.value,
        () => {
          clearTimeout(debounceTimer);
          debounceTimer = setTimeout(async () => {
            getSubreddits();
          }, 500);
        }
      );
    });
    return {
      autocomplete,
      searchTerm,
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
</style>
