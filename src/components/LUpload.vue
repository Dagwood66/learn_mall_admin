<template>
    <el-upload action="/api/uploadFile" :file-list="imgList" :on-remove="handleRemove" :on-success="handleSuccess"
               :list-type="'picture'">
        <el-button size="small" type="primary">点击上传</el-button>
    </el-upload>
</template>

<script>
    export default {
        name: "LUpload",
        props: {
            value: String
        },
        data() {
            return {
                imgList: []
            };
        },
        watch: {
            value() {
                if (this.value) {
                    this.imgList = [{
                        name: "",
                        url: this.value
                    }];
                }
            }
        },
        methods: {
            handleRemove() {
                this.imgList = [];
                this.$emit("input", "");
            },
            handleSuccess(res, file) {
                this.$emit("input", res.data.imgUrl);
            }
        },
    }
</script>

<style scoped lang="less">

</style>