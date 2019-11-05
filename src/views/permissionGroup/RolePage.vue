<template>
    <div>
        <l-page-nav></l-page-nav>
        <div>

        </div>
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