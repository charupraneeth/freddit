<template>
  <Navbar />
  <Main />
</template>

<script>
import Main from "./components/Main.vue";
import Navbar from "./components/Navbar.vue";
export default {
  name: "App",
  components: {
    Main,
    Navbar,
  },
};
</script>
<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  background: #212121;
}
/* #app {
  color: #ffffff;
} */
</style>
