// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'babel-polyfill'
import axios from 'axios'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import {api,get,postJson,postUrl} from './assets/api'
import '@/assets/css/reset.css'
import '@/assets/css/basic.css'
import mBtn from '@/components/m-btn.vue'
import './icons'
Vue.component('mBtn',mBtn)

Vue.use(ElementUI)
Vue.config.productionTip = false

axios.defaults.timeout = 10000;
//axios.defaults.url = '/api';
//axios.defaults.baseURL = "http://192.168.1.21:8081";
axios.defaults.baseURL = "http://10.1.4.92:8080/tunnelMonitor";


router.beforeEach((to,from,next) => {
  let isLogin =  sessionStorage.getItem('login');
  console.log(to.path)
  if(isLogin == "1"){
    if(to.path === "/login"){
      sessionStorage.removeItem('token');
      next({ path: '/' })
    }else{
      next();
    }
  }else {
    if(to.path === '/login'){
      next()
    }else{
      next({path:'/login'})
    }
  }
})
Vue.prototype.$api = api
Vue.prototype.$get = get
Vue.prototype.$postJson = postJson
Vue.prototype.$postUrl = postUrl
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
