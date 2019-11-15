<template>
    <div>
        <el-row :gutter="20">
            <el-col>
                <el-button @click="addItem">添加</el-button>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col>
                <el-table :data="dataList" :stripe="true" :border="true">
                    <el-table-column prop="name" label="名称" width="120"></el-table-column>
                    <el-table-column prop="price" label="价格"></el-table-column>
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
    import {getGoodsList, deleteGoodsById} from "../utils/HttpUtils"

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
                getGoodsList({
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
            addItem() {
                this.$router.push({
                    path: "/goodsAdd"
                })
            },
            editItem(item) {
                this.$router.push({
                    path: "/goodsUpdate",
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
                    deleteGoodsById(item.id).then(res => {
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