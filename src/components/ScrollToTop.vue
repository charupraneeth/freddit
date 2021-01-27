<template>
  <div class="container">
    <div class="container">
      <a href="#top" id="pointer">👆</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "ScrollToTop",
};
</script>

<style scoped>
#pointer {
  font-size: x-large;
  z-index: 20;
  position: fixed;
  top: 90%;
  right: 5%;
}
</style>
