import Vue from 'vue'
import router from './router'
import store from './store'
import App from './App.vue'

import './styles/theme.scss';

import Buefy from 'buefy'

import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faCoffee,
  faEye,
  faEyeSlash
} from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(
  faCoffee,
  faEye,
  faEyeSlash
  );

Vue.component('vue-fontawesome', FontAwesomeIcon);

Vue.use(Buefy, {
  defaultIconComponent: "vue-fontawesome",
  defaultIconPack: "fas"
});

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
});
