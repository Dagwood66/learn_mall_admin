<template>
    <div>
        <el-table :data="dataList" :stripe="true" :border="true">
            <el-table-column prop="phone" label="手机号" width="120"></el-table-column>
            <el-table-column prop="nickname" label="昵称" width="100"></el-table-column>
            <el-table-column prop="avatar_url" label="头像"></el-table-column>
            <el-table-column label="操作" width="150">
                <template slot-scope="scope">
                    <el-button size="mini" @click="editItem(scope.row)">编辑</el-button>
                    <el-button size="mini" @click="deleteItem(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination layout="prev,pager,next" @current-change="handleCurrentChange" :total="total"
                       :size="pageSize"></el-pagination>
    </div>
</template>

<script>
    import {getUserList} from "../../utils/HttpUtils"

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
                getUserList({
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
            editItem(item){

            },
            deleteItem(item){

            }
        }
    }
</script>