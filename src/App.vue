<template>
  <div class="container" style="position:relative">
    <Navbar />
    <Info v-show="isInfoShown" />
    <!-- <ScrollToTop /> -->
    <router-view />
  </div>
</template>
<script>
import isInfoShown from "@/store/infoState";
import Info from "@/components/Info";
import Navbar from "@/components/Navbar";
// import ScrollToTop from "@/components/ScrollToTop";
export default {
  components: {
    Navbar,
    Info,
    // ScrollToTop,
  },
  setup() {
    return {
      isInfoShown,
    };
  },
};
</script>

<style></style>
