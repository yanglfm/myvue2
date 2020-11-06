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
    </div>
</template>

<script>

    export default {
        name: "index",
        data() {
            return {
                tableData: [],

            }
        },

        created() {
            this.$store.dispatch('GetWebLogList', this.$store.getters.username).then(res => {
                console.error("GetWebLogList----->", res)
                this.tableData = res.data;

            });
        },
        methods: {
            handleSelectionChange(val) {
                this.multipleSelection = val;
            }
        }
    }
</script>

<style scoped>

</style>