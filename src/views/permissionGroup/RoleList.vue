<template>
    <div>
        <el-table :data="dataList" :stripe="true" :border="true">
            <el-table-column prop="name" label="名称" width="150"></el-table-column>
            <el-table-column prop="memo" label="备注"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button @click="editItem(scope.row)">编辑</el-button>
                    <el-button @click="deleteItem(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination layout="prev,pager,next" @current-change="handleCurrentChange"
                       :total="total" :size="pageSize"></el-pagination>
    </div>
</template>

<script>
    import {getRoleList} from "../../utils/HttpUtils"

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
                getRoleList({
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
            },
            deleteItem(item) {
                // TODO 删除
                this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            editItem(item) {

            }
        }
    }
</script>