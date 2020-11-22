import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from './views/Login.vue'
import Home from "@/views/Home";
import Test1 from "@/views/Test1";
import Test2 from "@/views/Test2";
Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login,
        //  用于标识，是否显示
        hidden:true
    }, {
        path: '/home',
        name: 'Home',
        component: Home,
        hidden:true
    }, {
        path: '/home',
        name: '导航一',
        component: Home,
        //  新加children属性，这样菜单会
        children:[
            {
                path: '/test1',
                name: '选项1',
                component: Test1
            },{
                path: '/test2',
                name: '选项2',
                component: Test2
            }
        ]
    }

]

const router = new VueRouter({
    routes
})

export default router
