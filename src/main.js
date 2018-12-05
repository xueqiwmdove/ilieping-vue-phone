// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueCookies from 'vue-cookies'
import Vuex from 'vuex'
import VueJsonp from 'vue-jsonp';
import qs from 'qs'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css';


Vue.config.productionTip = false

Vue.use(VueAxios, axios)

Vue.use(VueCookies)
Vue.use(VueJsonp)
Vue.use(Mint)

Vue.use(Vuex)

//开启debug模式
Vue.config.debug = true;
axios.defaults.withCredentials=true;//withCredentials默认是false，意思就是不携带cookie信息，那就让它为true，我是全局性配置的
axios.defaults.timeout = 30000;
axios.interceptors.response.use((res) => {
  if (res.status === 200) {
   if(res.data.code == 40401){
		router.replace({
		  path: '/Invalid',
		});
   }
	return res;
	} else {
		alert('网络错误');
	}
});

Vue.prototype.$axios = axios;
export default axios;

import '../src/assets/css/base/common.scss' //引入全局css
import '../src/assets/css/index.css'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

//路由切换时回到顶部
router.afterEach((to,from,next) => {
  window.scrollTo(0,0);
});