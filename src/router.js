import Vue from 'vue'
import Router from 'vue-router'
import Layout from './layout/Index'
import $store from './store.js'

/**
 * 命名规则
 *      1. 列表数据路由后缀 List
 *      2. 添加数据路由后缀 Add
 *      3. 修改数据路由后缀 Update
 * Meta说明
 *      title 路由名称(暂用于添加/修改界面标题显示)
 * */
Vue.use(Router);

const baseRoutesLocal = [
    {
        path: '/',
        component: Layout,
        children: [{
            path: '/',
            component: () => import('./views/Home.vue')
        }]
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('./views/Login.vue')
    },
    // {
    //     path: "/*",
    //     component: () => import("./views/Page404.vue")
    // }
];

const asyncRoutesLocal = [
    {
        path: '/',
        component: Layout,
        children: [{
            path: '/userList',
            component: () => import('./views/user/UserList.vue')
        }, {
            path: '/goodsList',
            component: () => import('./views/GoodsList.vue')
        }, {
            path: 'goodsAdd',
            component: () => import('./views/Goods.vue'),
            meta: {
                title: "商品添加"
            }
        }, {
            path: 'goodsUpdate',
            component: () => import('./views/Goods.vue'),
            meta: {
                title: "商品编辑"
            }
        }, {
            path: '/orderList',
            component: () => import('./views/OrderList.vue')
        }]
    },
    {
        path: '/permissionGroup',
        component: Layout,
        children: [
            {// 角色列表
                path: 'roleList',
                component: () => import('./views/permissionGroup/RoleList.vue')
            },
            {// 权限列表
                path: 'permissionList',
                component: () => import('./views/permissionGroup/PermissionList.vue')
            },
            {// 权限添加
                path: 'permissionAdd',
                component: () => import('./views/permissionGroup/Permission.vue'),
                meta: {
                    title: "权限添加"
                }
            },
            {// 权限编辑
                path: 'permissionUpdate',
                component: () => import('./views/permissionGroup/Permission.vue'),
                meta: {
                    title: "权限编辑"
                }
            },
            {// 角色权限编辑
                path: 'rolePermission',
                component: () => import('./views/permissionGroup/RolePermission.vue'),
                meta: {
                    title: "角色权限编辑"
                }
            },
            {// 角色添加
                path: 'roleAdd',
                component: () => import('./views/permissionGroup/Role.vue'),
                meta: {
                    title: "角色添加"
                }
            },
            {// 角色编辑
                path: 'roleUpdate',
                component: () => import('./views/permissionGroup/Role.vue'),
                meta: {
                    title: "角色编辑"
                }
            },
            {// 页面列表
                path: 'pageList',
                component: () => import('./views/permissionGroup/PageList.vue'),
                meta: {
                    title: "页面列表"
                }
            },
            {// 页面列表
                path: 'pageAdd',
                component: () => import('./views/permissionGroup/Page.vue'),
                meta: {
                    title: "页面添加"
                }
            },
            {// 页面修改
                path: 'pageUpdate',
                component: () => import('./views/permissionGroup/Page.vue'),
                meta: {
                    title: "页面修改"
                }
            },
            {// 页面修改
                path: 'rolePage',
                component: () => import('./views/permissionGroup/RolePage.vue'),
                meta: {
                    title: "角色页面管理"
                }
            },
        ]
    },
];

let router = new Router({
    routes: [
        ...baseRoutesLocal,
        ...asyncRoutesLocal
    ]
});

router.beforeEach((to, from, next) => {
    if (!$store.state.user.phone && to.path !== "/login") { // 未登录
        next("/login");
    } else { // 已登录
        if ($store.state.roles.length === 0) {
            router.addRoutes(asyncRoutesLocal);
            next();
        } else {
            next();
        }
    }
});

// 忽略重复路由跳转错误
let push = Router.prototype.push;
Router.prototype.push = function () {
    return push.apply(this, arguments).catch(err => err);
};

export const baseRoutes = baseRoutesLocal;

export const asyncRoutes = asyncRoutesLocal;

export default router
