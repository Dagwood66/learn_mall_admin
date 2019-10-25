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
            }, {
                path: '/goodsList',
                component: () => import('./views/GoodsList.vue')
            }]
        },
        {
            path: '/permissionGroup',
            name: 'permission',
            component: Layout,
            children: [{// 角色列表
                path: '/roleList',
                component: () => import('./views/permissionGroup/RoleList.vue')
            }, {// 权限列表
                path: '/permissionList',
                component: () => import('./views/permissionGroup/PermissionList.vue')
            }]
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('./views/Login.vue')
        }
    ]
})
