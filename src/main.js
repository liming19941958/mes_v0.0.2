import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './css/index.less'
import './css/index.css'
import App from './App.vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import router from './router.js'
// import routePath from './components/tabbar/HomeContainer'
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
Vue.http.options.root = 'http://192.168.1.122:9001/';
// Vue.http.options.root = 'http://localhost:9001/';

Vue.http.interceptors.push((request,next)  =>{

  var lastname = sessionStorage.getItem("token");
  var path = sessionStorage.getItem("Path");
  var a= true;
  console.log("mainjs" + lastname);
  if(a){
    request.headers.set('token',lastname);
    // request.headers.set('requestPage','/organization');
    request.headers.set('requestPage',path);


  }

  console.log(request.headers)

  next((response) => {
    console.log(response.status)
    return response
  });

});
// 全局配置emulateJSON
Vue.http.options.emulateJSON = true;
new Vue({
  render: h => h(App),

    router
}).$mount('#app');
