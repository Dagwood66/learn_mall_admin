<template>
    <div>
        <l-page-nav></l-page-nav>
        <el-row>
            <el-col>
                <el-tree ref="tree" class="custom-tree"
                         :data="dataList"
                         :props="{label:'name'}"
                         node-key="id"
                         :default-expanded-keys="[0]"
                         :indent="30"
                         :show-checkbox="true">
                </el-tree>
            </el-col>
        </el-row>
        <el-row>
            <el-col>
                <div>
                    <el-button type="primary" size="mini" @click="confirm">确认</el-button>
                    <el-button size="mini" @click="goBack">取消</el-button>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import {getPermissionPageList} from "../../utils/HttpUtils";
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
                getPermissionPageList().then(res => {
                    this.dataList = res.data.data;
                })
            },
            confirm() {
                let treeEl = this.$refs.tree;
                console.log(treeEl.getCheckedKeys(true));
            },
            goBack() {
                this.$router.go(-1);
            }
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