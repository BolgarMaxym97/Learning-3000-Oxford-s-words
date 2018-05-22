import Vue from 'vue'
import App from './App.vue'
import VTooltip from 'v-tooltip'

Vue.use(VTooltip);
new Vue({
  el: '#app',
  render: h => h(App)
});

$(document).ready(function () {
  $('.dataTable').DataTable({
    "language": {
      "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Russian.json"
    },
    "columnDefs": [{
      "targets": 2,
      "orderable": false
    }]
  });
  let showWelcome = +localStorage.getItem('showWelcome');
  if (showWelcome !== 1) {
    $('#welcome').modal('show');
    localStorage.setItem('showWelcome', 1);
  }
});
