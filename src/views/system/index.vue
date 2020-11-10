<template>
    <div>

        <!--label-width="100px"这个可以设置输入框的标题-->
        <el-form :model="statusForm" label-width="100px">

            <el-form-item label="用户名">
                <div data-v-6b1ea50c="" class="el-input el-input--suffix">
                    <input type="text" autocomplete="off" class="el-input__inner" v-model="statusForm.username"
                           @input="doCheckUsername">
                    <!--                <span>{{this.$store.getters.usernameCanUse}}</span>-->
                    <span class="el-input__suffix"><span class="el-input__suffix-inner">
                    <i :class="(statusForm.username.trim().length<3||statusForm.username.trim().length>18)?
                        'el-input__icon el-icon-circle-close':
                        statusForm.username===this.$store.getters.username||this.$store.getters.usernameCanUse?
                        'el-input__icon el-icon-circle-check':'el-input__icon el-icon-circle-close'"
                       :style="statusForm.username.trim()===''?'display:none':statusForm.username===this.$store.getters.username?
                       'color:#C0C4CC':
                      (statusForm.username.trim().length<3||statusForm.username.trim().length>18||!this.$store.getters.usernameCanUse)?'color:red':'color:#42b983'"></i></span></span>
                    <span>
                </span>
                </div>
            </el-form-item>

            <!--设置手机号的规则-->
            <!-- :suffix-icon="statusForm.phone===''?'':'el-icon-circle-check'"-->
            <el-form-item label="手机号">
                <el-input v-model="statusForm.phone"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="doEditUserInfo">修改</el-button>
                <el-button>取消</el-button>
            </el-form-item>

        </el-form>
    </div>
</template>

<script>
    export default {
        name: "index",
        data() {
            return {
                statusForm: {
                    username: '',
                    password: '',
                    phone: '',
                }
            }
        },
        methods: {
            doCheckUsername() {
                let username = this.statusForm.username
                if (username.trim().length < 3 || username.length > 18)
                    return
                this.$store.dispatch('CheckUsername', username).then(res => {

                        if (res.data === 2001) {
                            this.$message.error(res.msg)
                        }
                    }
                )
            },
            doEditUserInfo() {

            }
        }
    }
</script>

<style scoped>

    .el-input__suffix {
        right: 5px;
        transition: all .3s;
    }

    .el-input__suffix-inner {
        pointer-events: all;
    }

    .el-input__icon {
        height: 100%;
        width: 25px;
        text-align: center;
        transition: all .3s;
        line-height: 40px;
        color: #42b983;
    }

</style>