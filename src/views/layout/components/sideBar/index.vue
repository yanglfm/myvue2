<template>
    <div class="sidebar">

        <el-menu :show-timeout="200"
                 :default-active="$route.path"
                 mode="vertical"
                 text-color="#595959"
                 active-text-color="rgb(42,189,166)"

        >

            <side-bar-item v-for="route in menu" :key="route.path" :item="route"
                           :base-path="route.path"></side-bar-item>
            <!--            <side-bar-item  :routes="routes"></side-bar-item>-->
        </el-menu>

    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import SideBarItem from "./SideBarItem";

    export default {
        name: "index",
        data() {
            return {
                isCollapse: true
            }
        },

        computed: {
            ...mapGetters([
                'menu', 'sidebar'
            ]),
            routes() {
                console.log("routers--->", this.$store.getters.routers)
                console.log("routers--->", this.$store.getters.apiRouters)
                return this.$store.getters.apiRouters
            }
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        },
        components: {
            SideBarItem
        }

    }
</script>

<style scoped>

    /*.sidebar{*/
    /*    display: block;*/
    /*    position: absolute;*/
    /*    width: 25%;*/
    /*    left: 0;*/
    /*    top: 60px;*/
    /*    bottom:0;*/
    /*    background: #2E363F;*/
    /*}*/
    .noShow{
     display: none;
    }
    .sidebar > ul {
        height: 100%;
    }

    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        min-height: 400px;
    }

</style>