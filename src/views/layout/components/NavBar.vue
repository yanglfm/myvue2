<template>
    <div class="top_nav">
        <!--        <div class="button_div" @click="changeShow">-->
        <div class="button_div">
            <i class="el-icon-s-unfold" style="font-size: 30px;cursor: pointer;line-height: 60px"
               :class="[rotate?'go':'aa']" @click="start"></i>
            <!--            <i class="el-icon-s-unfold" v-show="!show" style="font-size: 30px;cursor: pointer;line-height: 60px"></i>-->

            <el-breadcrumb separator="/" style="margin-left: 10px;   font-size: 14px;line-height: 60px;">
                <!--to没有写。只是显示内容，没有设置可以跳转的路由-->
                <el-breadcrumb-item v-for="item of Array.from(breadCrumbList)"
                                    :key="item.path">{{item.name}}
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>


        <div class="menu_nav">
            <el-menu
                    :default-active="activeIndex2"
                    class="el-menu-demo"
                    mode="horizontal"
                    @select="handleSelect"
                    background-color="rgb(33, 186, 169)"
                    text-color="#fff"
                    active-text-color="#ffd04b">
                <el-submenu index="2" style="padding-left: 20px">
                    <template slot="title"><span><img class="userImg" src="@/assets/user/carrot.png" alt="">{{this.$store.getters.username}}</span>
                    </template>
                    <el-menu-item index="2-1"><a @click="editUserInfo">修改信息</a></el-menu-item>
                    <el-menu-item index="2-2">修改密码</el-menu-item>
                    <el-menu-item index="2-3"><a @click="loginOut">退出</a></el-menu-item>

                </el-submenu>
                <el-menu-item index="3">消息中心</el-menu-item>
                <el-menu-item index="4">订单管理</el-menu-item>
            </el-menu>
            <user-form :dialog-visible="dialogInfoVisible"   @closeDialog="closeDialogPA"></user-form>
            <!--            <user-password :userInfo="userInfoU"  :dialogVisible="dialogInfoVisible" @closeDialog="closeDialogPA"></user-password>-->

        </div>
    </div>
</template>

<script>
    import UserForm from "../../../components/userInfo/UserForm";
    import UserPassword from "../../../components/userInfo/UserPassword";

    export default {
        name: "NavBar",
        data() {
            return {
                activeIndex: '1',
                activeIndex2: '1',
                rotate: false,
                dialogInfoVisible: false,
                userInfoU: 'ldlslsldl',
                show: false,
                breadCrumbList: [],
                user:{
                    name:'',
                    userId:'',
                }
            };
        },
        watch: {
            $route() {
                this.getBreadCrumb()
            }
        },
        created() {
            this.getBreadCrumb();
        },
        computed: {
            visitedViews() {
                console.log("views--->", this.$store.state.tagsView.visitedViews)
                return this.$store.state.tagsView.visitedViews
            }
        },
        components: {
            UserPassword,
            UserForm
        },
        methods: {
            start() {
                this.rotate = !this.rotate;
                console.log("-opened--->",this.$store.getters.sidebar.opened)
                this.$store.dispatch('showNavBar');
            },
            changeShow() {
                this.show = !this.show
            },
            closeDialogPA(flag) {
                this.dialogInfoVisible = flag
            },
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
                console.log(key);
                console.log(key === '2-1');
                console.log(keyPath);
                if (key === '2-1') {
                    this.dialogInfoVisible = true

                }
                if (key === '2-3') {
                    this.loginOut();
                }
            },
            editUserInfo() {
                this.dialogInfoVisible = true
                console.log("00000--->", this.dialogInfoVisible)
            },
            loginOut() {
                this.$store.dispatch('LoginOut').then(() => {
                    // this.$router.push({path: '/login'})
                    //这样可以清除用户信息和路由信息
                    location.reload()
                })
            },
            getBreadCrumb() {
                // console.log("router_matched--->", this.$route.matched)
                let matched = this.$route.matched.filter(item => item.name)
                // console.log("matched--->", matched)
                // const first = matched[0]
                // if (first && first.name !== 'dashboard') {
                //     matched = [{path: '/dashboard', meta: {title: 'Dashboard'}}].concat(matched)
                // }

                this.breadCrumbList = matched
                // console.log("breadCrumbList--->", this.breadCrumbList)
            }
        }
    }
</script>

<style scoped>
    .aa {
        transition: all 0.3s;
    }

    .go {
        transform: rotate(180deg);
        transition: all 0.2s;
    }


    .top_nav {
        display: flex;
        background-color: rgb(33, 186, 169);
        justify-content: space-between;
    }

    .button_div {
        display: flex;
    }

    .user-info {
        float: right;
        padding-right: 50px;
        font-size: 16px;
        color: #fff;
    }

    .user-info .el-dropdown-link {
        position: relative;
        display: inline-block;
        padding-left: 50px;
        color: #fff;
        cursor: pointer;
        vertical-align: middle;
    }

    .user-info .user-logo {
        position: absolute;
        left: 0;
        top: 15px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }


    .userImg {
        position: absolute;
        right: 60px;
        top: 15px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }

    .username {
        position: absolute;
        right: 20px;
        top: 0;
        width: 50px;
        font-size: 10px;
        /* line-height: 50px; */
        text-align: center;
        color: #fff;
        cursor: pointer;
    }

    .username a {
        text-decoration: none;
    }

    .el-menu--horizontal > .el-submenu {
        float: right;
    }

    .el-menu--horizontal > .el-menu-item {
        float: right;
        height: 60px;
        line-height: 60px;
        margin: 0;
        color: #909399;
    }


    .el-menu.el-menu--horizontal {
        border-bottom: none;
    }

</style>