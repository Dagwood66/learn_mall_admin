<template>
    <el-container>
        <el-aside>
            <el-menu
                style="height: 100vh;overflow: hidden;"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b">
                <el-menu-item index="0" @click="$router.push('/?_='+new Date().getTime())">
                    <i class="el-icon-setting"></i>
                    <span slot="title">统计汇总</span>
                </el-menu-item>
                <el-menu-item index="1" @click="$router.push('/userList?_='+new Date().getTime())">
                    <i class="el-icon-setting"></i>
                    <span slot="title">用户列表</span>
                </el-menu-item>
                <el-menu-item index="2" @click="$router.push('/goodsList?_='+new Date().getTime())">
                    <i class="el-icon-setting"></i>
                    <span slot="title">商品列表</span>
                </el-menu-item>
                <el-menu-item index="3" @click="$router.push('/orderList?_='+new Date().getTime())">
                    <i class="el-icon-setting"></i>
                    <span slot="title">订单列表</span>
                </el-menu-item>
                <el-submenu index="4">
                    <template slot="title">
                        <i class="el-icon-setting"></i>
                        <span>权限管理</span>
                    </template>
                    <el-menu-item index="4-1"
                                  @click="$router.push('/permissionGroup/roleList?_='+new Date().getTime())">
                        <i class="el-icon-setting"></i>
                        <span slot="title">角色列表</span>
                    </el-menu-item>
                    <el-menu-item index="4-2"
                                  @click="$router.push('/permissionGroup/permissionList?_='+new Date().getTime())">
                        <i class="el-icon-setting"></i>
                        <span slot="title">权限列表</span>
                    </el-menu-item>
                    <el-menu-item index="4-3"
                                  @click="$router.push('/permissionGroup/pageList?_='+new Date().getTime())">
                        <i class="el-icon-setting"></i>
                        <span slot="title">页面管理</span>
                    </el-menu-item>
                </el-submenu>
            </el-menu>
        </el-aside>
        <el-container>
            <el-header>
                <el-row type="flex" justify="end">
                    <el-dropdown>
                        <span>{{user.nickname}}<i class="el-icon-arrow-down el-icon--right"></i></span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item @click.native="loginOut">退出</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-row>
            </el-header>
            <el-main>
                <router-view :key="key"></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    import {mapState} from "vuex"
    import {getLoginOut} from "../utils/HttpUtils";

    export default {
        computed: {
            ...mapState({
                user: state => state.user
            }),
            key() {
                return this.$route.path + new Date().getTime();
            }
        },
        methods: {
            loginOut() {
                getLoginOut().then(res => {
                    // 清空缓存
                    this.$store.commit("setUser", {});
                    this.$store.commit("setRoles", []);
                    // 刷新页面-(清空动态路由权限)
                    window.history.go(0);
                })
            }
        }
    }
</script>
