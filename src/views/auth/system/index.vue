<template>
    <div>

        <!--label-width="100px"这个可以设置输入框的标题-->
        <el-form ref="ruleForm" :model="statusForm" label-width="100px" :rules="rules">

            <el-form-item label="用户名" prop="username">
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
            <el-form-item label="用户名" prop="username">
                <el-input v-model="statusForm.username"></el-input>
            </el-form-item> <el-form-item label="手机号" prop="phone">
                <el-input v-model="statusForm.phone"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="statusForm.password"></el-input>
            </el-form-item>

            <el-form-item>
                <el-progress :percentage="passwordPercent" :format="passwordPercentFormat"
                             :color="colors"></el-progress>
            </el-form-item>
            <!--强中弱-->
            <!--  <div class="form-group clearfix" style="margin-bottom: 5px;">
                  <span class="col-sm-7" style="color: #707070; padding-bottom: 5px;">(以字母开头，长度在6~18之间，包含字母、数字和特殊符号)</span>
                  <div class="col-sm-10 pull-right">
                      <div id="level" class="pw-strength" style="margin-left: 20px">
                          <div class="pw-bar"></div>
                          <div class="pw-bar-on"></div>
                          <div class="pw-txt">
                              <span>弱</span>
                              <span>中</span>
                              <span>强</span>
                          </div>
                      </div>
                  </div>
              </div>-->

            <el-form-item label="创建时间" prop="createTime">
                <el-input v-model="statusForm.createTime"></el-input>
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
        /*   mounted: function () {
               let self = this;
               //密码强弱校验
               $(document).ready(function () {
                   // 密码强度校验
                   // 强： 密码为八位及以上并且字母数字特殊字符三项都包括,强度最强
                   // 中： 密码为七位及以上并且字母、数字、特殊字符三项中有两项，强度是中等
                   // 弱： 密码为6位及以下，就算字母、数字、特殊字符三项都包括，强度也是弱的
                   $('#new_pwd').keyup(function () {
                       var strongRegex = new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$", "g");
                       var mediumRegex = new RegExp("^(?=.{7,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$", "g");
                       var enoughRegex = new RegExp("(?=.{6,})(^[a-zA-Z]).*", "g");
                       if (false == enoughRegex.test($(this).val())) {
                           //密码小于六位并且非字母开头的时候，密码强度图片都为灰色,不可提交修改
                           $('#level').removeClass('pw-weak');
                           $('#level').removeClass('pw-medium');
                           $('#level').removeClass('pw-strong');
                           $('#level').addClass(' pw-defule');
                           self.pwdStrength = 'unable';
                           console.log("1", self.pwdStrength)
                       }
                       else if (strongRegex.test($(this).val())) {
                           //密码为八位及以上并且字母数字特殊字符三项都包括,强度最强，可提交修改
                           $('#level').removeClass('pw-weak');
                           $('#level').removeClass('pw-medium');
                           $('#level').removeClass('pw-strong');
                           $('#level').addClass(' pw-strong');
                           self.pwdStrength = 'strong';
                           console.log("2", self.pwdStrength)
                       }
                       else if (mediumRegex.test($(this).val())) {
                           //密码为七位及以上并且字母、数字、特殊字符三项中有两项，强度是中等，可提交修改
                           $('#level').removeClass('pw-weak');
                           $('#level').removeClass('pw-medium');
                           $('#level').removeClass('pw-strong');
                           $('#level').addClass(' pw-medium');
                           self.pwdStrength = 'medium';
                           console.log("3", self.pwdStrength)
                       }
                       else {
                           //如果密码为6为及以下，就算字母、数字、特殊字符三项都包括，强度也是弱的,不可提交修改
                           $('#level').removeClass('pw-weak');
                           $('#level').removeClass('pw-medium');
                           $('#level').removeClass('pw-strong');
                           $('#level').addClass('pw-weak');
                           self.pwdStrength = 'week';
                           console.log("4", self.pwdStrength)
                       }
                       return true;
                   });
               });
           },
           */
        data() {
            /*密码*/
            /**
             *  var passwordreg = /(?=.*\d)(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{6,16}/
             if (!passwordreg.test(value)) {
                       callback(new Error('密码必须由数字、字母、特殊字符组合,请输入6-16位'))
                     }else{
                       callback()
                     }

             *
             * */
            /*
            * 密码设置规则6-16位字符,同时包括数字、大小写字母和特殊字符四种组合; 特殊字符需在“~ @ # $ % * _ - + = : , . ?”范围内.
            *  *let passReg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[~@#$%\*-\+=:,\\?\[\]\{}]).{6,16}$/
            * 密码设置规则6-16位字符，可以为数字和字母的组合，可不包括特殊字符
            * */
            var validatorPass = (rule, value, callback) => {
                // let passReg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[~@#$%\*-\+=:,\\?\[\]\{}]).{6,16}$/
                // if (!passReg.test(value)) {
                //     callback(new Error('请设置正确格式的密码'+'--密码设置规则6-16位字符,同时包括数字、大小写字母和特殊字符四种组合; 特殊字符需在“~ @ # $ % * _ - + = : , . ?”范围内.'));
                // } else {
                //     callback();
                // }
                // 密码强度校验
                // 强： 密码为八位及以上并且字母数字特殊字符三项都包括,强度最强
                // 中： 密码为七位及以上并且字母、数字、特殊字符三项中有两项，强度是中等
                // 弱： 密码为6位及以下，就算字母、数字、特殊字符三项都包括，强度也是弱的
                var strongRegex = new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$", "g");
                var mediumRegex = new RegExp("^(?=.{7,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$", "g");
                var enoughRegex = new RegExp("(?=.{6,})(^[a-zA-Z]).*", "g");
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    //6-20位包含字符、数字和特殊字符
                    var ls = 0;
                    if (this.statusForm.password !== '') {
                        if (this.statusForm.password.match(/([a-z])+/)) {
                            ls++;
                        }
                        if (this.statusForm.password.match(/([0-9])+/)) {
                            ls++;
                        }
                        if (this.statusForm.password.match(/([A-Z])+/)) {
                            ls++;
                        }
                        if (this.statusForm.password.match(/([\W])+/) && !this.statusForm.password.match(/(![\u4E00-\u9FA5])+/)) {
                            ls++;
                        }
                        if (this.statusForm.password.length < 6 || this.statusForm.password.length > 20) {
                            callback(new Error('要求6-20位字符'));
                            ls = 0;
                        }
                        if (this.statusForm.password.match(/([\u4E00-\u9FA5])+/)) {
                            callback(new Error('不能包含中文字符'));
                            ls = 0;
                        }
                        switch (ls) {
                            case 0:
                                this.passwordPercent = 0;
                                callback(new Error('数字、小写字母、大写字母以及特殊字符中四选三'));
                                break;
                            case 1:
                                this.passwordPercent = 33;
                                callback(new Error('数字、小写字母、大写字母以及特殊字符中四选三'));
                                break;
                            case 2:
                                this.passwordPercent = 66;
                                callback(new Error('数字、小写字母 、大写字母以及特殊字符中四选三'));
                                break;
                            case 3:
                            case 4:
                                this.passwordPercent = 100;
                                break;
                            default:
                                this.passwordPercent = 0;
                                break;
                        }
                    }
                    callback();

                }

            };
            /**
             * 1.密码加密传输
             * 2.根据输入的密码实时显示密码的强度
             */

            /*固定电话*/
            /**
             * 公司组织机构代码：reg= /^[A-Z0-9]{8}-[A-Z0-9]$|^[A-Z0-9]{8}-[A-Z0-9]-[0-9]{2}$/;
             * 正数（最多两位小数）：reg = /^(([1-9]\d*(\.\d{1,2})?)|(0\.\d{1,2}))$/;
             */
            var validatePhone = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('机构电话不可为空'));
                } else {
                    if (value !== '') {
                        var reg = /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/;
                        if (!reg.test(value)) {
                            callback(new Error('请输入正确的手机号或者座机号格式为：0000-0000000'));
                        }
                    }
                    callback();
                }
            };

            /*手机号*/
            var validatorPhone = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入手机号'));
                } else {
                    if (value !== '') {
                        let reg = /^1[3456789]\d{9}$/;
                        if (!reg.test(value)) {
                            callback(new Error('请输入有效的手机号码'));
                        }
                    }
                    callback();
                }
            };

            /*邮箱*/
            var validateEmail = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请正确填写邮箱'));
                } else {
                    if (value !== '') {
                        var reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
                        if (!reg.test(value)) {
                            callback(new Error('请输入有效的邮箱'));
                        }
                    }
                    callback();
                }
            };
            /*微信号*/
            var validateWeixin = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('微信号不能为空'));
                } else {
                    var reg = /^[a-zA-Z][a-zA-Z0-9_-]{5,19}$/;
                    if (!reg.test(value)) {
                        callback(new Error('请输入正确的微信号码'));
                    } else {
                        callback();
                    }
                }
            };

            var validateUsername = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error("用户名不能为空"))
                } else {
                    if (value !== '' && (value.trim().length < 3 || value.trim().length > 18)) {
                        callback(new Error('用户名的长度3-18个字符'))
                    } else {
                        callback()
                    }
                }
            }
            return {
                statusForm: this.$store.getters.user,
                rules: {
                    phone: [
                        {validator: validatorPhone, trigger: 'blur'}
                    ],
                    password: [
                        {validator: validatorPass, trigger: ['blur', 'change']}
                    ],
                    username: [
                        {validator: validateUsername, trigger: ['blur', 'change']}
                    ],
                },
                passwordPercent: 0,
                colors: [
                    /*颜色条为啥总是对不准*/
                    {color: '#f5faaa', percentage: 0},
                    {color: '#f56c6c', percentage: 33},
                    {color: '#e6a23c', percentage: 66},
                    {color: '#5cb87a', percentage: 100},
                    // {color: '#1989fa', percentage: 80},
                    // {color: '#6f7ad3', percentage: 100}
                ],

            }
        },
        methods: {

            passwordPercentFormat(percentage) {
                return percentage === 100 ? '符合' : `不符`;
            },
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
                console.log("----userForm----", this.statusForm)
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