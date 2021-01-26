<template>
  <div class="info-card-container">
    <div class="card info-card">
      <div class="close-btn-container right">
        <i @click="isInfoShown = false" class="material-icons small grey-text"
          >close</i
        >
      </div>
      <div class="card-content orange-text">
        <span class="card-title"><b>Freddit</b></span>
        <p class="grey-text text-darken-3" style="margin-bottom:15px">
          A free subreddit client for reddit
        </p>
        <p class="grey-text">made with</p>
        <a
          href="https://v3.vuejs.org/"
          class="blue-text"
          style="margin-right:5px"
          >vue</a
        >
        <a href="https://materializecss.com/" class="blue-text"
          >materialize-css</a
        >
      </div>
      <div class="card-action">
        Made with boredom 🥱 by <a href="https://praneeth.live">Bority</a>
      </div>
    </div>
  </div>
</template>

<script>
import isInfoShown from "@/store/infoState";
export default {
  name: "Info",
  setup() {
    return {
      isInfoShown,
    };
  },
};
</script>

<style scoped>
.info-card-container {
  z-index: 10;
  background: rgb(248, 236, 212);
  position: fixed;
  top: 0%;
  left: 0;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.info-card {
  margin: 0 auto;
  width: 450px;
}
.close-btn-container {
  margin: 15px;
  cursor: pointer;
}
</style>
