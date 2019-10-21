<template>
    <div>
        <el-form :model="form">
            <el-form-item label="手机号">
                <el-input v-model="form.phone"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input type="password" v-model="form.pwd"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">登录</el-button>
            </el-form-item>
        </el-form>
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
                    if (res.data.status === "1") {
                        this.$router.push("/");
                    }
                })
            }
        }
    }
</script>
