<template>
    <div>
        <el-dialog title="用户信息" :visible.sync="dialogVisible" @close="closeCallback">
            <el-form :model="form">
                <el-form-item label="用户名" :label-width="formLabelWidth">
                    <el-input v-model="form.username" autocomplete="off" @input="doChangeUsername"></el-input>
                </el-form-item>
                <el-form-item label="密码" :label-width="formLabelWidth">
                    <el-input v-model="form.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="手机号" :label-width="formLabelWidth">
                    <el-input v-model="form.phone" autocomplete="off"></el-input>
                </el-form-item>

                <!--                <el-form-item label="创建时间" :label-width="formLabelWidth"  disabled="true">-->
                <!--                    <el-input v-model="form.createTime" disabled ></el-input>-->
                <!--                </el-form-item>-->
                <el-form-item label="创建时间" :label-width="formLabelWidth">
                    <el-col>
                        <el-date-picker type="date" placeholder="选择日期" v-model="form.createTime"
                                        style="width: 100%;" disabled></el-date-picker>
                    </el-col>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeCallback">取 消</el-button>
                <el-button type="primary" @click="doChangeUserInfo">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "userForm",
        props: {
            dialogVisible: {
                type: Boolean
            },
        },
        mounted() {

        },
        updated() {

        },
        computed: {
            // visible: function () {
            //     return this.dialogVisible
            // }
            //
        },

        /**
         * vue.runtime.esm.js?2b0e:619 [Vue warn]: Avoid mutating a prop directly since the value will be overwritten whenever the parent component re-renders. Instead, use a data or computed property based on the prop's value. Prop being mutated: "dialogVisible"

         found in

         ---> <UserForm> at src/components/userInfo/UserForm.vue
         <NavBar> at src/views/layout/components/NavBar.vue
         <Layout> at src/views/layout/Layout.vue
         <App> at src/App.vue
         <Root>
         */
        created() {


        },

        data() {
            return {
                visible: this.dialogVisible,
                /*  form: {
                      username: this.$store.getters.username,
                      password: this.$store.getters.user.password,
                      phone: this.$store.getters.user.phone,
                      createTime: '',
                      region: '',
                      date1: '',
                      date2: '',
                      delivery: false,
                      type: [],
                      resource: '',
                      desc: ''
                  },*/
                form: this.$store.getters.user,
                formLabelWidth: '120px'
            };
        },
        methods: {
            /**
             * 监听用户输入的用户名，避免输入的用户名与已存在的6用户名重复
             * */
            doChangeUsername() {
                console.log(this.form.username)
            },
            //获取的时间对象转字符串
            // Transformation(times) {
            //     var time = times;
            //     var time1 = time.getTime();
            //     console.log("time1---" + time1)
            //     console.log(" h ---" + date.getHours())
            //     console.log(" m ---" + date.getMinutes())
            //     console.log(" s ---" + date.getSeconds())
            //     var date = new Date(time1),
            //         Y = date.getFullYear() + '-',
            //         M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-',
            //         D = date.getDate() + ' ',
            //         h = date.getHours() + ':',
            //         m = date.getMinutes() + ':',
            //         s = date.getSeconds();
            //     var current = Y + M + D + h + m + s
            //     return current
            // },

            closeCallback() {
                this.$emit('closeDialog')
            },
            doChangeUserInfo() {
                let time = this.moment(this.form.createTime).format('YYYY-MM-DD HH:mm:ss')
                this.form.createTime = time
                console.log(this.form)
                console.log(time)
            }
        }
    }
</script>

<style scoped>

</style>