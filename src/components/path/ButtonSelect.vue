<template>
    <div class="imSelector" @mouseleave="mouseleave">
        <p class="imSelectorTitle" @click="selectorToggle">
            {{value ? value : (title ? title : '-- 请选择 --')}} <i ></i>
        </p>
        <el-collapse-transition>
            <div class="imSelectorMenu" v-show="show">
                <p @click="getMenu(null, mark)">{{title ? title : '-- 请选择 --'}}</p>
                <p v-for="(menu, index) in items" :key="index" @click="getMenu(menu, mark)">
                    {{menu.dataItem}}
                </p>
            </div>
        </el-collapse-transition>
    </div>
</template>

<!--http://blog.xuxiangbo.com/im-46.html-->
<!--

mouseleave：当鼠标滑出当前selector的时候关闭下拉选项，这里有个问题，原则上来说这个地方可以定义为组件内部事件，不需要在调用组件的时候再去添加一个mouseleave事件，但是在内部定义这个事件会在执行的时候报一个warn，大概意思是vue不建议在组件内部修改父组件传过来的数据，emmm....通常情况下我们是不关心warn的，但是强迫症你懂的，，，，这个问题肯定可以通过其他方式解决的，但由于对VUE没有很深入的研究，而且暂时没有太多时间去处理，所以先放着。

selectorToggle：没什么说的，切换下拉选项的显示 or 隐藏。

getMenu：选择某一项，带两个参数，第一个参数title 是选择项的数据，为null则代表不选择任何项。第二个参数mark用于标记当前selector，避免调用多个组件时出现冲突。点击时向父组件传递一个chose事件，参数为选择的下拉项和当前标记。

然后是 props：
title：下拉框的标题，默认为--- 请选择 ---。

items：下拉选项的列表，接受一个数组。

show：控制下拉框的显示 or 隐藏。

value：下拉框当前状态的值。

mark：下拉框唯一标记
-->

<script>
    export default {
        name: "ButtonSelect",
        props:['title', 'items', 'show', 'value', 'mark'],
        methods: {
            selectorToggle: function(event){
                this.$emit('click', event);
            },
            getMenu: function(value, mark){
                this.$emit('chose', {data: value, mark: mark});
            },
            mouseleave: function(event){
                this.$emit('mouseleave', event)
            }
        }
    }
</script>

<style scoped>

</style>