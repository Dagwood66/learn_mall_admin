<template>
    <div>
        <l-page-nav></l-page-nav>
        <el-form v-model="form" label-width="120px">
            <el-form-item label="名称:">
                <el-col :span="8">
                    <el-input v-model="form.name"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="LOGO:">
                <el-col :span="8">
                    <l-upload v-model="form.logo_url"></l-upload>
                </el-col>
            </el-form-item>
            <el-form-item label="价格:">
                <el-col :span="8">
                    <el-input type="number" v-model="form.price"></el-input>
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
    import LPageNav from "../components/LPageNav";
    import {getGoodsById, postGoods, putGoodsById} from "../utils/HttpUtils";
    import LUpload from "../components/LUpload";

    export default {
        components: {LUpload, LPageNav},
        data() {
            return {
                isEdit: /Update$/g.test(this.$route.path),
                id: this.$route.query.id,
                form: {
                    name: "",
                    logo_url: "",
                    price: null,
                },
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
                getGoodsById(this.id).then(res => {
                    this.form = res.data.data;
                }, res => {
                    this.goBack();
                })
            },
            confirm() {
                if (this.isEdit) {
                    putGoodsById(this.id, this.form).then(res => {
                        this.$message.success("修改成功");
                        this.goBack();
                    })
                } else {
                    postGoods(this.form).then(res => {
                        this.$message.success("添加成功");
                        this.goBack();
                    })
                }
            },
            goBack() {
                this.$router.go(-1);
            },
        }
    }
</script>