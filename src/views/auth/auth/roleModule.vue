<template>
    <div>
        <el-form :inline="true" :model="formRole" class="demo-form-inline">
            <el-form-item label="目录">
                <el-select v-model="formRole.region" placeholder="请选择目录">
                    <el-option v-for='item of list' v-bind:key="item.id" :label="item.name" :value="item.id">
                        {{item.name}}
                    </el-option>
                    <el-option label="无" value=""></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <div class="second_div">
            <div class="user_div">
                <el-tree
                        :data="list"
                        show-checkbox
                        :props="defaultUserProps"
                >
                </el-tree>
            </div>
            <div class="module_div">
                <el-tree
                        :data="data"
                        show-checkbox
                        node-key="id"
                        :default-checked-keys="checkedKeys"
                        :props="defaultProps">
                </el-tree>
            </div>
        </div>


    </div>
</template>

<script>
    export default {
        name: "roleModule",
        created() {
            // console.log("roles--->", this.$store.getters.roles)
            this.getModule()
        },
        data() {
            return {
                formRole: {
                    region: '',
                },
                list: [],
                data: [],
                defaultProps: {
                    children: 'children',
                    label: 'name'
                },
                defaultUserProps: {
                    label: 'username',
                },
                checkedKeys: [],
            }
        },

        methods: {
            getModule() {
                var roles = []
                let roleIds = ''
                this.$store.getters.roles.forEach(item => {
                    roles.push(item.id)
                    roleIds += item.id + ","
                })
                console.log("roleIds---->", roleIds.substring(0, roleIds.length - 1))
                console.log("roles-->", roles)
                this.$store.dispatch("GetModule", roleIds.substring(0, roleIds.length - 1) + ",2").then(res => {
                    console.log(res)
                    this.data = res.data.allModuleList
                    this.list = res.data.userList
                    this.data.forEach(item => {
                        this.checkedKeys.push(item.id)
                    })
                })
            }
        }
    }
</script>

<style scoped>

    .second_div {
        display: flex;
        flex-direction: row;
        /*justify-content: space-between;*/
        align-items: stretch;
    }

    /*.user_div*/
</style>