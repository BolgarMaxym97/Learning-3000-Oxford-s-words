import Vue from 'vue'
import App from './components/App.vue'
import VTooltip from 'v-tooltip'

Vue.use(VTooltip);
let vm = new Vue({
  el: '#app',
  render: h => h(App)
});

$(document).ready(function () {
  let showWelcome = +localStorage.getItem('showWelcome');
  if (showWelcome !== 1) {
    $('#welcome').modal('show');
    localStorage.setItem('showWelcome', 1);
  }
});
