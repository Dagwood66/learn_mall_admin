<template>
    <el-container>
        <el-aside>
            <el-menu
                style="height: 100vh;"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b">
                <el-menu-item index="1" @click="$router.push('/userList')">
                    <i class="el-icon-setting"></i>
                    <span slot="title">用户列表</span>
                </el-menu-item>
                <el-menu-item index="2" @click="$router.push('/goodsList')">
                    <i class="el-icon-setting"></i>
                    <span slot="title">商品列表</span>
                </el-menu-item>
                <el-menu-item index="3">
                    <i class="el-icon-setting"></i>
                    <span slot="title">订单列表</span>
                </el-menu-item>
                <el-submenu index="4">
                    <template slot="title">
                        <i class="el-icon-setting"></i>
                        <span>权限管理</span>
                    </template>
                    <el-menu-item index="4-1" @click="$router.push('/roleList')">
                        <i class="el-icon-setting"></i>
                        <span slot="title">角色列表</span>
                    </el-menu-item>
                    <el-menu-item index="4-2" @click="$router.push('/permissionList')">
                        <i class="el-icon-setting"></i>
                        <span slot="title">权限列表</span>
                    </el-menu-item>
                    <el-menu-item index="4-3" @click="$router.push('/rolePermissionList')">
                        <i class="el-icon-setting"></i>
                        <span slot="title">角色权限列表</span>
                    </el-menu-item>
                    <el-menu-item index="4-4" @click="$router.push('/userRoleList')">
                        <i class="el-icon-setting"></i>
                        <span slot="title">用户角色列表</span>
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
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    import {mapState} from "vuex"

    export default {
        computed: {
            ...mapState({
                user: state => state.user
            })
        },
        mounted() {
            if (this.user.phone == null) {
                this.$router.push("/login");
            }
        },
        methods: {
            loginOut() {
                this.$router.push("/login");
            }
        }
    }
</script>