<template>
    <div class="outer_div">

        <div :class="this.$store.getters.sidebar.opened?'side_bar':'no_show_side_bar'">
            <side-bar></side-bar>
        </div>
        <div class="main_div">
           <!-- <div class="nav_bar">
                <nav-bar></nav-bar>
            </div>
            <div class="tag_div">
                <tag-view></tag-view>
            </div>-->
            <div class="content_div">

                <div class="app_main">
                    <app-main></app-main>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import NavBar from "./components/NavBar";
    import SideBar from "./components/sideBar/index";
    import AppMain from "./components/AppMain";
    import TagView from "./components/TagsView";

    export default {
        name: "Layout",
        components: {
            TagView,
            NavBar, SideBar, AppMain
        }
    }
</script>
<style scoped>

    .outer_div {
        display: flex;
        /*background-color: #909399;*/
    }

    /*.nav_bar {*/
    /*    background-color: chocolate;*/
    /*}*/

    .side_bar {
        /*background-color: darkgreen;*/
        border: 1px solid black;
        flex: 1.5;
    }

    .no_show_side_bar {

        display: none;
    }

    .main_div {
        /*background-color: #acd;*/
        border: 1px solid black;
        flex: 8.5;
        min-width: 500px;
        display: flex;
        flex-direction: column;
    }

    .content_div {
        /*display: flex;*/
        flex-direction: column;
        padding: 10px 20px;
    }

    .tag_div {
        height: 34px;
        border-bottom: 1px solid #d8dce5;
        padding: 2px 0 0 2px;
    }

    .app_main {
        margin-top: 10px;
        flex: 9;
        height: 90%;
    }

</style>