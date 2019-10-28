<template>
    <div>
        <l-page-nav></l-page-nav>
        <el-form v-model="form" label-width="120px">
            <el-form-item label="名称:">
                <el-col :span="8">
                    <el-input v-model="form.name"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="类型:">
                <el-col :span="8">
                    <el-input v-model="form.type"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="接口网址:">
                <el-col :span="8">
                    <el-input v-model="form.url"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="备注:">
                <el-col :span="8">
                    <el-input v-model="form.memo"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="confirm">确认</el-button>
                <el-button @click="goBack">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import LPageNav from "../../components/LPageNav";
    import {getPermissionById, postPermission, putPermission} from "../../utils/HttpUtils";

    export default {
        components: {LPageNav},
        data() {
            return {
                isEdit: /Update$/g.test(this.$route.path),
                id: this.$route.query.id,
                form: {},
            }
        },
        mounted() {
            if (this.isEdit) {
                this.getDataInfo();
            } else {

            }
        },
        methods: {
            getDataInfo() {
                getPermissionById(this.id, {test: 1}).then(res => {
                    this.form = res.data.data;
                }, res => {
                    this.goBack();
                })
            },
            confirm() {
                if (this.isEdit) {
                    putPermission(this.id, this.form).then(res => {
                        this.$message.success("修改成功");
                        this.goBack();
                    })
                } else {
                    postPermission(this.form).then(res => {
                        this.$message.success("添加成功");
                        this.goBack();
                    })
                }
            },
            goBack() {
                this.$router.go(-1);
            }
        }
    }
</script>