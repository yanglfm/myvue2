<template>
    <div>
        <el-table
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange">
            <el-table-column
                    type="selection"
                    min-width="15%"
            >
            </el-table-column>
            <el-table-column
                    prop="description"
                    label="路径描述"

                    min-width="25%">
            </el-table-column>
            <el-table-column
                    prop="contentPath"
                    label="地址"

                    min-width="30%"
            >
            </el-table-column>
            <el-table-column
                    label="日期"
                    min-width="30%"
            >
                <template slot-scope="scope">{{ scope.row.insertTime }}</template>
            </el-table-column>
        </el-table>

        <div class="block">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="pageSizeList"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="totalCount">
            </el-pagination>
        </div>
    </div>
</template>

<script>

    export default {
        name: "index",
        data() {
            return {
                tableData: [],
                pageSizeList: [10, 20, 50, 100, 200],//[100, 200, 300, 400]
                pageSize: 10,//当前选择上述的pageSizeList数组里的任一个值
                currentPage: 1,//当前页
                totalCount: 0,//总共数据量
            }
        },

        created() {
            this.getWebLogList();
        },
        methods: {
            getWebLogList() {
                let params = {
                    username: this.$store.getters.username,
                    pageNo: this.currentPage,
                    pageNum: this.pageSize,
                }
                this.$store.dispatch('GetWebLogList', params).then(res => {

                    this.tableData = res.data.tableData;
                    this.totalCount=res.data.totalNum;
                });
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleSizeChange(val) {
                this.pageSize = val
                this.getWebLogList();
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.currentPage = val
                this.getWebLogList();
                console.log(`当前页: ${val}`);
            }
        }
    }


</script>

<style scoped>

</style>