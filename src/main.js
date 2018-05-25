import Vue from 'vue'
import App from './components/App.vue'
import VTooltip from 'v-tooltip'
import VueResource from 'vue-resource'

Vue.use(VTooltip);
Vue.use(VueResource);

let vm = new Vue({
  el: '#app',
  render: h => h(App)
});
