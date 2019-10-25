<template>
    <div>
        <el-table :data="dataList" :stripe="true" :border="true">
            <el-table-column prop="name" label="名称" width="120"></el-table-column>
            <el-table-column prop="price" label="价格" width="100"></el-table-column>
        </el-table>
        <el-pagination layout="prev,pager,next" @current-change="handleCurrentChange" :total="total"
                       :size="pageSize"></el-pagination>
    </div>
</template>

<script>
    import {getRolePermissionList} from "../../utils/HttpUtils"

    export default {
        data() {
            return {
                dataList: [],
                total: 0,
                page: 0,
                pageSize: 10,
            }
        },
        mounted() {
            this.getDataList();
        },
        methods: {
            getDataList() {
                getRolePermissionList({
                    params: {
                        page: this.page,
                        pageSize: this.pageSize,
                    }
                }).then(res => {
                    if (res.data.status === "1") {
                        this.dataList = res.data.data.list;
                        this.total = res.data.data.total;
                    }
                })
            },
            handleCurrentChange(page) {
                this.page = page - 1;
                this.getDataList();
            }
        }
    }
</script>