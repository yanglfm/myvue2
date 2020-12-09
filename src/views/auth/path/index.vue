<template>
    <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="标题">
                <el-input v-model="formInline.title"></el-input>
            </el-form-item>
            <el-form-item label="目录">
                <el-select v-model="formInline.region" placeholder="请选择目录">
                    <el-option label="无" value="">无</el-option>
                    <el-option v-for='item of list' v-bind:key="item.id" :label="item.name" :value="item.id">
                        {{item.name}}
                    </el-option>
                </el-select>
            </el-form-item>
            <button type="button" class="el-button el-button--text el-button--small"> 页面排序</button>
            <button type="button" class="el-button el-button--text el-button--small"> 历史版本</button>
            <el-form-item>
                <el-button type="primary" class="el-button--medium" @click="titleSubmit">保存</el-button>
            </el-form-item>

        </el-form>
    </div>
</template>

<script>
    import store from "../../../store";

    export default {
        name: "index",
        created() {

            console.log("this---router-----" + store.getters.apiRouters)
            /**
             * 过滤path=*的路径
             */
            var list = store.getters.apiRouters.filter(item => {
                if (item.path !== "*") {
                    console.log(item, item.name, item.path)
                    return item;
                }
            })
            this.list = list
        },
        data() {
            return {
                formInline: {
                    title: '',
                    region: '',
                },
                show: false,
                showChooseOr: false,
                list: [],
            }
        },
        methods: {

            titleSubmit() {
                console.log(this.formInline)
                console.log(this.formInline.title)
                console.log(this.formInline.region)
                var path = {
                    path: '/path/' + this.randomWord(false, 5),
                    title: this.formInline.title,
                    component: this.formInline.region === '' ? 'Layout' : 'auth/auth/comPage',
                    parentId: this.formInline.region,
                }
                this.addPath(path);
            },
            showChoose() {
                this.showChooseOr = !this.showChooseOr
            },
            // 下拉菜单
            handleClose() {
                this.show = false;
            },
            addPath(path) {
                this.$store.dispatch("AddPath", path).then(res => {
                    console.log(res);
                })
            },

            /**
             * randomWord 产生任意长度随机字母数字组合
             * randomFlag-是否任意长度 min-任意长度最小位[固定位数] max-任意长度最大位
             * xuanfeng 2014-08-28
             *
             * 使用方法
             生成3-32位随机串：randomWord(true, 3, 32)
             生成43位随机串：randomWord(false, 43)
             * */
            randomWord(randomFlag, min, max) {
                var str = "",
                    range = min,
                    arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

                // 随机产生
                if (randomFlag) {
                    range = Math.round(Math.random() * (max - min)) + min;
                }
                for (var i = 0; i < range; i++) {
                    var pos = Math.round(Math.random() * (arr.length - 1));
                    str += arr[pos];
                }
                return str;
            }

        },
    }
</script>

<style scoped>

</style>