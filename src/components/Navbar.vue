<template>
  <nav class="transparent">
    <div class="nav-wrapper container row">
      <div class="col s3 ">
        <a href="/" class="brand-logo ">Freddit</a>
      </div>
      <div class="input-field col s7">
        <input
          id="search"
          class="grey darken-3 white-text"
          type="search"
          required
        />
        <label class="label-icon" for="search"
          ><i class="material-icons grey-text text-lighten-3">search</i></label
        >
        <i class="material-icons grey-text text-lighten-3">close</i>
      </div>
      <div class="col s2">
        <a href="/about"><i class="material-icons">info</i></a>
      </div>
    </div>
  </nav></template
>

<script>
export default {
  name: "Navbar",
};
</script>

<style lang="scss" scoped></style>
