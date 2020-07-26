import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './css/index.less'
import './css/index.css'
import App from './App.vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import router from './router.js'
import 'bootstrap/dist/css/bootstrap.css'
// 全局引入echarts
// import echarts from 'echarts'
// Vue.prototype.$echarts = echarts

Vue.config.productionTip = false;
// Vue.use(echarts);
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(ElementUI);
//如果我们通过全局配置了请求数据的接口 根域名，则在每次单独发起
// http 请求的时候，请求的url 路径，应该以相对路径 开头，
// 前面不带 “/”，否则，不会启动根路径做拼接
Vue.http.options.root = '/root'
// 全局配置emulateJSON
Vue.http.options.emulateJSON = true;
new Vue({
  render: h => h(App),
    router
}).$mount('#app');
