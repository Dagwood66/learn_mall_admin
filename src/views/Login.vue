<template>
    <div class="login-module">
        <h1>后台管理系统</h1>
        <el-form :model="form" label-width="80px">
            <el-form-item label="手机号:">
                <el-input v-model="form.phone"></el-input>
            </el-form-item>
            <el-form-item label="密码:">
                <el-input type="password" v-model="form.pwd"></el-input>
            </el-form-item>
        </el-form>
        <el-button type="primary" @click="onSubmit">登录</el-button>
    </div>
</template>

<script>
    import axios from "axios"

    export default {
        data() {
            return {
                form: {
                    phone: "",
                    pwd: ""
                }
            }
        },
        methods: {
            onSubmit() {
                this.$store.dispatch("postLogin", {
                    ...this.form
                }).then(res => {
                    if (this.$route.query.redirect) {
                        // 防止$route.go(-1)回到登陆
                        this.$router.replace({
                            path: this.$route.query.redirect,
                            query: {
                                ...this.$route.query
                            }
                        });
                    } else {
                        this.$router.push("/");
                    }
                })
            }
        }
    }
</script>

<style scoped lang="less">
    .login-module {
        display: flex;
        height: 100vh;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
</style>
