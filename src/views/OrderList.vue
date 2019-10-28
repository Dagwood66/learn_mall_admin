<template>
    <div>
        <el-row :gutter="20">
            <el-col>
                <el-button size="small" @click="addItem">添加</el-button>
            </el-col>
        </el-row>
        <el-row>
            <el-col>
                <el-table :data="dataList" :stripe="true" :border="true">
                    <el-table-column prop="goods_id" label="商品Id" width="100"></el-table-column>
                    <el-table-column prop="goods_price" label="商品价格" width="120"></el-table-column>
                    <el-table-column prop="user_id" label="用户Id"></el-table-column>
                    <el-table-column label="操作" width="150">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="editItem(scope.row)">编辑</el-button>
                            <el-button size="mini" @click="deleteItem(scope.row)">删除</el-button>
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
    import {getOrderList, deletePermissionById} from "../utils/HttpUtils"

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
                getOrderList({
                    page: this.page,
                    pageSize: this.pageSize,
                }).then(res => {
                    this.dataList = res.data.data.list;
                    this.total = res.data.data.total;
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