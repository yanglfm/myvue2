<template>
    <div class="AppMainContent">

        <div class="contentDiv">
            <router-view/>
        </div>
    </div>
</template>

<script>
    export default {
        name: "AppMain",
        data() {
            return {

            }
        },
        mounted() {

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
        methods: {
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

    /*.AppMainContent {*/
    /*    position: absolute;*/
    /*    right: 0;*/
    /*    width: 70%;*/
    /*    top: 18%;*/

    /*}*/



    .contentDiv {
        width: 100%;

    }
</style>