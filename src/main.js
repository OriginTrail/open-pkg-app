import Vue from 'vue';
import App from './App.vue';
import store from './store';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Web3 = require("web3");
const ethUtil = require('ethereumjs-util');

window.$ = window.jQuery = require('jquery');

Vue.config.productionTip = false;



new Vue({
  store,
  render: h => h(App)
}).$mount('#app');
