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
Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(ElementUI);
new Vue({
  render: h => h(App),
    router
}).$mount('#app');