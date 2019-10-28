<template>
    <div>
        <l-page-nav></l-page-nav>
        <el-row>
            <el-col>
                <el-transfer v-model="selectDataList" :data="dataList" :props="{key:'id',label:'name'}"
                             :titles="['未允许权限','允许权限']"></el-transfer>
                <div>
                    <el-button type="primary" @click="confirm">确认</el-button>
                    <el-button @click="goBack">取消</el-button>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import {getPermissionList, getRolePermissionById, putRolePermissionById} from "../../utils/HttpUtils"
    import LPageNav from "../../components/LPageNav";

    export default {
        components: {LPageNav},
        data() {
            return {
                id: this.$route.query.id,
                dataList: [],
                selectDataList: [],
            }
        },
        mounted() {
            this.getDataList();
        },
        methods: {
            getDataList() {
                getRolePermissionById(this.id).then(res => {
                    this.selectDataList = res.data.data;
                });
                getPermissionList().then(res => {
                    this.dataList = res.data.data.list;
                })
            },
            confirm() {
                putRolePermissionById(this.id, this.selectDataList).then(res => {
                    this.$message.success("修改成功");
                    this.goBack();
                });
            },
            goBack() {
                this.$router.go(-1);
            }
        }
    }
</script>