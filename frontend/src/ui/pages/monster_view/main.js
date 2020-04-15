import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;

const el = document.getElementById('app');

new Vue({
  render: h =>
    h(App, {
      props: { ...el.dataset }
    }),
  el
});
