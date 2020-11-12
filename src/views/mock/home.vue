<template>
    <div>
        这是home页面
        (使用Mock模拟数据直接在前台演示)
        <el-table
                :data="tableData"
                style="width: 100%">
            <el-table-column
                    prop="id"
                    label="日期"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="姓名"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="age"
                    label="地址">
            </el-table-column>
            <el-table-column
                    prop="job"
                    label="地址">
            </el-table-column>
            <el-table-column label="操作" min-width="200">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">编辑
                    </el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: "home",
        data() {
            return {
                tableData: [],
            }
        },
        created() {
            this.getDemoList()
        },
        methods: {
            getDemoList() {
                this.$store.dispatch('GetDemoList').then(res => {
                    this.tableData = res.data;
                })
            },
            handleEdit(index, row) {
                console.log(index, row);
                row.age = row.age - 5;
                this.$store.dispatch('DoUpdateUser', row).then(res => {
                    console.log("=======>", res)
                })
            },
            handleDelete(index, row) {
                console.log(index, row);
            }
        }
    }
</script>

<style scoped>

</style>