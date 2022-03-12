import Vue from "vue";
import App from "./App.vue";
import ElementUI from "element-ui";
import "./styles.scss";
import YoSchemaForm from "./packages//yo-schema-form/index";
Vue.use(YoSchemaForm);
Vue.use(ElementUI);
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
