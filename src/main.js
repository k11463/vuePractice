import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import sweetAlert from 'vue-sweetalert'

import {router} from './router';
import {store} from './store';

Vue.use(VueAxios, axios)
Vue.use(sweetAlert)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
