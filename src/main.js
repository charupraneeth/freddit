import { createApp } from "vue";
import App from "./App.vue";
import "materialize-css/dist/css/materialize.min.css";
import router from './router'
import './registerServiceWorker'

createApp(App).use(router).mount("#app");
