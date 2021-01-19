<template>
  <nav class="transparent">
    <div class="nav-wrapper container row">
      <div class="col s3 ">
        <!-- <img src="@/assets/logo.png" class="logo" alt="" /> -->
        <a href="/" class="brand-logo deep-orange-text text-lighten-2">
          Freddit</a
        >
      </div>
      <div class="input-field col s7">
        <input
          id="search"
          class="grey darken-3 white-text"
          type="search"
          required
        />
        <label class="label-icon" for="search"
          ><i class="material-icons deep-orange-text text-lighten-2"
            >search</i
          ></label
        >
        <i class="material-icons deep-orange-text text-lighten-2">close</i>
      </div>
      <div class="col s2">
        <a href="/about"
          ><i class="material-icons  deep-orange-text text-lighten-2"
            >info</i
          ></a
        >
      </div>
    </div>
  </nav></template
>

<script>
export default {
  name: "Navbar",
};
</script>

<style scoped></style>
