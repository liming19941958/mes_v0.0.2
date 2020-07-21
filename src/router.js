import VueRouter from 'vue-router'
import HomeContainer from './components/tabbar/HomeContainer'
import MenberContainer from './components/tabbar/SystemSettings'
import SearchContainer from './components/tabbar/BasicInformation'
import ShoppingCartsContainer from './components/tabbar/MoldManagement'
import LoginPage from './components/tabbar/LoginContainer'


//创建路由对象
var router = new VueRouter({
    routes:[
        {path:'/',redirect:'/LoginPage'},
        {path:'/LoginPage',component:LoginPage},
        {path:'/HomeContainer',component:HomeContainer},
        {path:'/MenberContainer',component:MenberContainer},
        {path:'/SearchContainer',component:SearchContainer},
        {path:'/ShoppingCartsContainer',component:ShoppingCartsContainer},
    ]
});
export default router