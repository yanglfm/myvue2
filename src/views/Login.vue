<template>
    <div>
        <el-form action="" v-model="formValue">
            姓名： <input type="text" v-model="formValue.username">
            <br>
            密码： <input type="password" v-model="formValue.password">
            <br>
            <button type="button" @click="submitForm">提交</button>
        </el-form>

    </div>
</template>

<script>
    import api from '../api/fetch'
    import {login, userInfo} from "../api/login";

    export default {
        name: "Login",
        data() {
            return {
                formValue: {
                    username: 'tom',
                    password: '123456',
                }
            }
        },
        methods: {
            submitForm() {
                // api('/user/login', {
                //     username: this.formValue.username,
                //     password: this.formValue.password
                // }, 'POST',).then(res => {
                //     console.log(res);
                //     this.$router.replace({path: "/"})
                // })
                this.$store.dispatch('Login', this.formValue).then(() => {
                    this.$router.push({path: this.redirect || '/'})
                })
            }
        }
    }
</script>

<style scoped>

</style>