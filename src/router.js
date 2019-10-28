import Vue from 'vue'
import Router from 'vue-router'
import Layout from './layout/Index'

Vue.use(Router);
/**
 * 命名规则
 *      1. 列表数据路由后缀 List
 *      2. 添加数据路由后缀 Add
 *      3. 修改数据路由后缀 Update
 * Meta说明
 *      title 路由名称(暂用于添加/修改界面标题显示)
 * */
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
            }, {
                path: '/orderList',
                component: () => import('./views/OrderList.vue')
            }]
        },
        {
            path: '/permissionGroup',
            name: 'permission',
            component: Layout,
            children: [
                {// 角色列表
                    path: '/roleList',
                    component: () => import('./views/permissionGroup/RoleList.vue')
                },
                {// 权限列表
                    path: '/permissionList',
                    component: () => import('./views/permissionGroup/PermissionList.vue')
                },
                {// 权限添加
                    path: '/permissionAdd',
                    component: () => import('./views/permissionGroup/Permission.vue'),
                    meta: {
                        title: "权限添加"
                    }
                },
                {// 权限编辑
                    path: '/permissionUpdate',
                    component: () => import('./views/permissionGroup/Permission.vue'),
                    meta: {
                        title: "权限编辑"
                    }
                }
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('./views/Login.vue')
        },
        {
            path: "/*",
            component: () => import("./views/Page404.vue")
        }
    ]
})
