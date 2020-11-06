<template>
    <div>


        <div v-if="!item.hidden&&item.children" class="menu-wrapper">

            <template
                    v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)
                    &&!item.alwaysShow&&item.children[0].name==='首页'">
                <app-link :to="resolvePath(onlyOneChild.path)">
                    <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{'submenu-title-noDropdown':!isNest}">
                        <i :class="item.icon"></i>
                        <span v-if="item.children[0].meta&&item.children[0].meta.title">{{item.children[0].meta.title}}</span>
                    </el-menu-item>
                </app-link>
            </template>

            <el-submenu v-else :index="resolvePath(item.path)">
                <template slot="title">
                    <i :class="item.icon"></i>
                    <span v-if="item.meta&&item.meta.title">{{item.meta.title}}</span>
                </template>
                <template v-for="child in item.children">
                    <sidebar-item
                            v-if="child.children&&child.children.length>0"
                            :is-nest="true"
                            :item="child"
                            :key="child.path"
                            :base-path="resolvePath(child.path)"
                            class="nest-menu"/>
                    <app-link v-else :to="resolvePath(child.path)" :key="child.name">
                        <el-menu-item :index="resolvePath(child.path)">
                            <!--                            <item v-if="child.meta" :icon="child.meta.icon" :title="child.meta.title"/>-->
                            <i :class="child.meta.icon"></i>
                            <span v-if="child.meta&&child.meta.title">{{child.meta.title}}</span>
                            <!--                            <span>{{item.children[0].name}}</span>-->
                        </el-menu-item>
                    </app-link>
                </template>
            </el-submenu>

        </div>

    </div>
</template>

<script>
    import path from 'path'
    import AppLink from './Link'
    import {isExternal} from '@/utils'

    export default {
        name: "SideBarItem",
        components: {AppLink},

        props: {
            // route object
            item: {
                type: Object,
                required: true
            },
            isNest: {
                type: Boolean,
                default: false
            },
            basePath: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                onlyOneChild: null
            }
        },
        methods: {
            hasOneShowingChild(children, parent) {
       /*         console.error("children--->", children)
                console.error("parent--->", parent)*/
                const showingChildren = children.filter(item => {
                    if (item.hidden) {
                        return false
                    } else {
                        // Temp set(will be used if only has one showing child)
                        this.onlyOneChild = item
                        return true
                    }
                })
                // console.error("showingChildren--->", showingChildren)
                // When there is only one child router, the child router is displayed by default
                if (showingChildren.length === 1) {
                    return true
                }

                // Show parent if there are no child router to display
                if (showingChildren.length === 0) {
                    this.onlyOneChild = {...parent, path: '', noShowingChildren: true}
                    return true
                }

                return false
            },
            resolvePath(routePath) {
                if (this.isExternalLink(routePath)) {
                    return routePath
                }
                return path.resolve(this.basePath, routePath)
            },
            isExternalLink(routePath) {
                return isExternal(routePath)
            },

        }
    }
</script>

<style scoped>
    a:-webkit-any-link {
        color: -webkit-link;
        cursor: pointer;
        text-decoration: none;
    }

    .el-submenu .el-menu-item {
        height: 50px;
        line-height: 50px;
        padding: 0 45px;
        min-width: 100px;
    }

</style>