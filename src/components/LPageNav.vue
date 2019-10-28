<template>
    <el-row>
        <el-col>
            <el-page-header @back="goBack" :content="$route.meta.title"></el-page-header>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        name: "LPageNav",
        methods: {
            goBack() {
                this.$router.go(-1);
            }
        }
    }
</script>