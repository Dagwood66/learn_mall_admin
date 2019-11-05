<template>
    <div>
        <el-row :gutter="20">
            <el-col>
                <el-button size="small" @click="addItem({id:0})">添加</el-button>
            </el-col>
        </el-row>
        <el-tree class="custom-tree" :data="dataList" :props="{label:'name'}" node-key="id" :default-expanded-keys="[0]"
                 :indent="30">
            <div style="display: flex;justify-content: space-between;align-items:center;flex: 1;margin: 10px 0;"
                 slot-scope="{node,data}">
                <span>{{node.label}}</span>
                <span v-if="data.id!==0">
                    <el-button size="mini" @click.stop="addItem(data)">添加</el-button>
                    <el-button size="mini" @click.stop="updateItem(data)">修改</el-button>
                    <el-button size="mini" @click.stop="deleteItem(data)">删除</el-button>
                </span>
            </div>
        </el-tree>
    </div>
</template>

<script>
    import {getPermissionPageList, deletePermissionById} from "../../utils/HttpUtils";

    export default {
        data() {
            return {
                dataList: [],
            }
        },
        mounted() {
            this.getDataList();
        },
        methods: {
            getDataList() {
                getPermissionPageList().then(res => {
                    this.dataList = res.data.data;
                })
            },
            addItem(item) {
                this.$router.push({
                    path: "/permissionGroup/pageAdd",
                    query: {
                        parent_id: item.id
                    }
                })
            },
            updateItem(item) {
                this.$router.push({
                    path: "/permissionGroup/pageUpdate",
                    query: {
                        id: item.id,
                        parent_id: item.id
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

<style scoped lang="less">
    .custom-tree {
        /deep/ .el-tree-node__content {
            height: 40px;
        }
    }
</style>