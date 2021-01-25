<template>
  <div class="container" style="position:relative">
    <Navbar />
    <Info v-show="isInfoShown" />
    <router-view />
  </div>
</template>
<script>
import isInfoShown from "@/store/infoState";
import Info from "@/components/Info";
import Navbar from "@/components/Navbar";
export default {
  components: {
    Navbar,
    Info,
  },
  setup() {
    return {
      isInfoShown,
    };
  },
};
</script>

<style></style>
