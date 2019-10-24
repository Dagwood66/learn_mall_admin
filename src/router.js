import Vue from 'vue'
import Router from 'vue-router'
import Layout from './layout/Index'

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Layout,
            children: [{
                path: '/',
                component: () => import('./views/Home.vue')
            }, {
                path: '/userList',
                component: () => import('./views/user/UserList.vue')
            }]
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('./views/Login.vue')
        }
    ]
})
