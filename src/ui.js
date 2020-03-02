import Vue from "vue";
import App from "./App";
import Color from "./Color";

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  render: h => h(Color)
});
