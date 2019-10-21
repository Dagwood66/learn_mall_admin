<template>
    <el-container>
        <el-aside>
            <el-menu
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b">
                <el-menu-item index="1">
                    <i class="el-icon-setting"></i>
                    <span slot="title">用户列表</span>
                </el-menu-item>
                <el-menu-item index="2">
                    <i class="el-icon-setting"></i>
                    <span slot="title">商品列表</span>
                </el-menu-item>
                <el-menu-item index="3">
                    <i class="el-icon-setting"></i>
                    <span slot="title">订单列表</span>
                </el-menu-item>
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