<template>
  <nav class="container  transparent">
    <div class="nav-wrapper">
      <form>
        <div class="input-field">
          <input
            ref="autocomplete"
            class="autocomplete"
            id="autocomplete-input"
            type="search"
            required
          />
          <label class="label-icon" for="search"
            ><i class="material-icons">search</i></label
          >
          <i class="material-icons">close</i>
        </div>
      </form>
    </div>
  </nav>
</template>

<script>
import { ref, onMounted } from "vue";
import M from "materialize-css";
export default {
  name: "Navbar",
  setup() {
    const autocomplete = ref(null);
    onMounted(() => {
      const instance = M.Autocomplete.init(autocomplete.value, {
        data: {
          Apple: null,
          Microsoft: null,
          Google: "https://placehold.it/250x250",
        },
      });
      instance.open();
    });
    return {
      autocomplete,
    };
  },
};
</script>

<style scoped></style>
