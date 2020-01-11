import Vue from 'vue'
import axios from 'axios'
import App from './App'
import router from './router'


import api from './api/index.js'
import jquery from 'jquery'
import utils from './utils/index.js'
import echarts from 'echarts'
import echartswordcloud from 'echarts-wordcloud';
import vuescroll from 'vuescroll';
import 'vuescroll/dist/vuescroll.css';
import VueAwesomeSwiper from 'vue-awesome-swiper'
import './style/swiper.min.css';
Vue.use(vuescroll);
Vue.use(VueAwesomeSwiper)

Vue.config.productionTip = false
Vue.prototype.$api = api
Vue.prototype.$echarts = echarts
Vue.prototype.$utils = utils


if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  template: '<App/>'
}).$mount('#app')
