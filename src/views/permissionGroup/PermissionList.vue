<template>
    <div>
        <el-row :gutter="20">
            <el-col>
                <el-button @click="addItem">添加</el-button>
            </el-col>
        </el-row>
        <el-row>
            <el-col>
                <el-table :data="dataList" :stripe="true" :border="true">
                    <el-table-column prop="name" label="名称" width="100"></el-table-column>
                    <el-table-column prop="type" label="类型" width="120"></el-table-column>
                    <el-table-column prop="url" label="接口网址" width="120"></el-table-column>
                    <el-table-column prop="memo" label="备注"></el-table-column>
                    <el-table-column label="操作" width="200">
                        <template slot-scope="scope">
                            <el-button @click="editItem(scope.row)">编辑</el-button>
                            <el-button @click="deleteItem(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination layout="prev,pager,next" @current-change="handleCurrentChange" :total="total"
                               :size="pageSize"></el-pagination>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import {getPermissionList, deletePermissionById} from "../../utils/HttpUtils"

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
                getPermissionList({
                    page: this.page,
                    pageSize: this.pageSize,
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
            addItem() {
                this.$router.push({"path": "/permissionAdd"})
            },
            editItem(item) {
                this.$router.push({
                    path: "/permissionUpdate",
                    query: {
                        id: item.id
                    }
                })
            },
            deleteItem(item) {
                this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deletePermissionById(item.id).then(res => {
                        this.$message.success("删除成功!");
                        this.getDataList();
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
        }
    }
</script>