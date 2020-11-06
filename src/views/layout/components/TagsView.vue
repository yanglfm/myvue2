<template>

    <div class="tagView">
        <div class="innerTagDiv">
            <el-tag ref="elTag"
                    :key="tag.path"
                    :to="tag.path"
                    :class="isActive(tag)?'active':''"
                    v-for="( tag,index) in Array.from(visitedViews)"
                    closable
                    :disable-transitions="false"
                    @close="closeSelectedTag(tag)"
                    @click="handleClick(tag,index,$event)"
                    @contextmenu.prevent.native="openMenu(tag,$event)"
            >
<!--                <i :class="isActive(tag)?'el-icon-phone':''"></i>-->

                <div style="" :class="isActive(tag)?'el-tag-circle':''"></div>
                {{tag.name}}
            </el-tag>
        </div>

        <ul v-show="this.visible" :style="{left:this.left+190+'px',top:this.top+55+'px'}" class="contextMenu">
            <li @click="closeSelectedTag(selectedTag)">关闭</li>
            <li @click="closeOthersTags">关闭其他</li>
            <li @click="closeAllTags">关闭全部</li>
        </ul>

    </div>


</template>

<script>


    export default {
        name: 'tagsView',

        data() {
            return {
                inputVisible: false,
                inputValue: '',
                visible: false,
                top: 0,
                left: 0,
                selectedTag: {},
            }
        },
        mounted() {

            this.addViewTags();
        },
        computed: {
            visitedViews() {
                console.log("views--->", this.$store.state.tagsView.visitedViews)
                return this.$store.state.tagsView.visitedViews
            }
        },
        watch: {
            $route() {
                console.log("watchRoute--->", this.$router)
                this.addViewTags()
            },
            //点击页面上的任意位置时，右键显示的内容全部隐藏
            visible(value) {
                if (value) {
                    document.body.addEventListener("click", () => {
                        this.visible = false
                    })
                } else {
                    document.body.removeEventListener("click", () => {
                        this.visible = false
                    })
                }
            }

        },

        methods: {
            openMenu(tag, e) {
                this.selectedTag = tag
                const menuMinWidth = 105
                const offsetLeft = this.$el.getBoundingClientRect().left // container margin left
                const offsetWidth = this.$el.offsetWidth // container width
                const maxLeft = offsetWidth - menuMinWidth // left boundary
                const left = e.clientX - offsetLeft // 15: margin right

                if (left > maxLeft) {
                    this.left = maxLeft
                } else {
                    this.left = left
                }

                this.top = e.clientY - 60 // fix 位置bug
                // this.left = e.clientX + 10
                // this.top = e.clientY

                this.visible = true
            },
            closeMenu() {
                this.visible = false
            },

            handleClose(tag) {
                this.$store.state.tagsView.visitedViews.splice(this.$store.state.tagsView.visitedViews.indexOf(tag), 1);
            },
            //点击标签事件
            handleClick(tag, index, e) {
                console.log("handleClick Tag--->", tag)
                // console.log(tag, e)
                // //所有的标签对象
                // console.log(this.$refs['elTag'])
                // const arr = this.$refs['elTag']
                // for (let i = 0; i < arr.length; i++) {
                //     //找到当前点击的标签对象，修改标签的颜色
                //     const dom = this.$refs['elTag'][i];
                //     dom.color = (index === i) ? '#faa' : '#ecf5ff'
                // }

                //避免工作台路径重复报错，设置路径不同时才改变路径
                if (this.$router.currentRoute.path !== tag.path) {
                    this.$router.replace({path: tag.path})
                }
            },


            generateRoute() {
                if (this.$route.name) {
                    return this.$route
                }
                return false
            },
            isActive(route) {
                return route.path === this.$route.path
            },
            addViewTags() {
                const route = this.generateRoute()
                if (!route) {
                    return false
                }

                this.$store.dispatch('addVisitedViews', route)
            },

            closeSelectedTag(view) {
                this.$store.dispatch('delVisitedViews', view).then((views) => {
                    if (this.isActive(view)) {
                        const latestView = views.slice(-1)[0]
                        if (latestView) {
                            this.$router.push(latestView.path)
                        } else {
                            this.$router.push('/')
                        }
                    }
                })
            },

            closeAllTags() {
                this.$store.dispatch('delAllViews')
                this.$router.push('/')
            },

            moveToCurrentTag() {
                const tags = this.$refs.elTag
                // this.$nextTick(() => {
                //     for (const tag of tags) {
                //         if (tag.to === this.$route.path) {
                //             console.log("tag---->",tag)
                //             break
                //         }
                //     }
                // })
            },

            closeOthersTags() {
                this.$router.push(this.selectedTag.path)
                console.log("this.selectedTag.path---->", this.selectedTag.path)
                this.$store.dispatch('delOthersViews', this.selectedTag).then(() => {
                    this.moveToCurrentTag()
                })
            },

        }
    }
</script>
<style scoped>


    .tagView .innerTagDiv {
        float: left;
    }

    .el-tag-circle{
        content: '';
        background: #fff;
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        position: relative;
        margin-right: 2px;
    }

    .el-tag + .el-tag {
        margin-left: 10px;
        border-radius: unset;
    }

    .el-tag {
        background-color: #fff;
        border-color: #d8dce5;
        display: inline-block;
        height: 32px;
        padding: 0 10px;
        line-height: 30px;
        font-size: 12px;
        color: #495060;
        border-width: 1px;
        border-style: solid;
        border-radius: unset;
        box-sizing: border-box;
        white-space: nowrap;
    }

    .el-tag .el-icon-close {
        border-radius: 50%;
        text-align: center;
        position: relative;
        cursor: pointer;
        font-size: 12px;
        height: 16px;
        width: 16px;
        line-height: 16px;
        vertical-align: middle;
        top: -1px;
        right: -5px;
        color: #d8dce5;
    }


    .el-tag .el-icon-close::before {
        display: block;
        color: #d8dce5;
    }

    .el-tag .el-icon-close::before {
        display: block;
    }

    .el-icon-close:before {

        color: black;
    }

    .el-tag .el-tag__close {
        color: black;
    }

    .active {
        background-color: #42b983;
        color: #fff;
        /*border-color: #409EFF;*/
        border-radius: unset;
    }


    .right-menu {
        border: 1px solid #eee;
        box-shadow: 0 0.5em 1em 0 rgba(0, 0, 0, .1);
        border-radius: 1px;
    }

    .right-menu li {
        width: 100%;
        padding: 5px 0;
        height: 28px;
        line-height: 28px;
        text-align: center;
        display: block;
        color: #606266;
        list-style: none;
    }

    .right-menu li:hover {
        background: red;
        color: #ffffff;
    }

    .contextMenu {
        background: #fff;
        z-index: 100;
        position: absolute;
        list-style-type: none;
        padding: 5px 0;
        font-size: 12px;
        font-weight: 400;
        color: #333;
        -webkit-box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
        box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
    }

    .contextMenu li {
        margin: 0;
        padding: 7px 16px;
        cursor: pointer;
    }

    .contextMenu li:hover {
        background: #999;
        color: #ffffff;
    }

    .el-tag .el-icon-close::before {
        display: block;
        color: rebeccapurple;
    }

    .el-icon-close:before {
        content: "\e6db";
    }
</style>

