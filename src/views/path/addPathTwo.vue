<template>
    <div>
        <div class="secondDiv">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="标题">
                    <el-input v-model="formInline.title"></el-input>
                </el-form-item>
                <el-form-item label="目录">
                    <el-select v-model="formInline.region" placeholder="请选择目录">
                        <el-option v-for='item of list' v-bind:key="item.id" :label="item.name" :value="item.id">
                            {{item.name}}
                        </el-option>

                        <el-option label="无" value=""></el-option>
                    </el-select>
                </el-form-item>
                <button type="button" class="el-button el-button--text el-button--small"> 页面排序</button>
                <button type="button" class="el-button el-button--text el-button--small"> 历史版本</button>
                <el-form-item>
                    <el-button type="primary" class="el-button--medium" @click="titleSubmit">保存</el-button>
                </el-form-item>


                <!--  <div class="el-form-item__content">
                      <div data-v-15e5a7a7="" class="el-dropdown" title="Ctrl + S">
                          <div class="el-button-group">
                              <button type="button" class="el-button el-button&#45;&#45;primary el-button&#45;&#45;medium">&lt;!&ndash;&ndash;&gt;
                                  &lt;!&ndash;&ndash;&gt;<span><span data-v-15e5a7a7="" id="save-page">保存</span> </span></button>
                              <button type="button"
                                      class="el-button el-button&#45;&#45;primary el-button&#45;&#45;medium el-dropdown__caret-button"
                                      aria-haspopup="list" aria-controls="dropdown-menu-7279" tabindex="0"
                                      @click="showChoose">&lt;!&ndash;&ndash;&gt;
                                  &lt;!&ndash;&ndash;&gt;<span><i class="el-dropdown__icon el-icon-arrow-down"></i></span></button>
                          </div>
                      </div>
                      <button data-v-15e5a7a7="" type="button" class="el-button el-button&#45;&#45;medium">&lt;!&ndash;&ndash;&gt;
                          &lt;!&ndash;&ndash;&gt;<span>返回</span></button>&lt;!&ndash;&ndash;&gt;</div>
                  <div :class="showChooseOr?'showDiv':'noShowDiv'">
                      <ul class="el-dropdown-menu el-popper el-dropdown-menu&#45;&#45;medium"
                          id="dropdown-menu-7279"
                          style="transform-origin: center top; z-index: 2018; position: absolute; top: 92px; left: 530px;"
                          x-placement="bottom-end">
                          <li tabindex="-1"  class="el-dropdown-menu__item"> 另存为模板</li>
                          <li tabindex="0" class="el-dropdown-menu__item el-tooltip item"
                              aria-describedby="el-tooltip-3257"> 锁定编辑
                          </li> &lt;!&ndash;&ndash;&gt;
                          <div x-arrow="" class="popper__arrow" style=""></div>
                      </ul>
                  </div>
                  &lt;!&ndash;                <button-select :></button-select>&ndash;&gt;
                  <div class="home" v-cloak>

                      <div class="menu">
  &lt;!&ndash;                        <p>下拉菜单</p>&ndash;&gt;
                          <div class="main" v-clickoutside="handleClose">
                              <button @click="show = !show">点击显示下拉菜单</button>
                              <ul class="dropdown" v-show="show">
                                  <li  class="el-dropdown-menu__item">另存为模板</li>
                                  <li  class="el-dropdown-menu__item">锁定编辑</li>
                                  <div x-arrow="" class="popper__arrow" style=""></div>
                              </ul>
                          </div>
                      </div>
                  </div>-->


            </el-form>

        </div>
        <common-page></common-page>
    </div>
</template>

<script>

    import CommonPage from "../../components/path/CommonPage";
    import ButtonSelect from "../../components/path/ButtonSelect";
    import store from "../../store";

    export default {
        name: "addPathTwo",
        components: {CommonPage, ButtonSelect},
        created() {
            // this.randomWord(false, 10);
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
                    component: 'auth/auth/comPage',
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
        //    自定义指令clickoutside绑定了一个函数handleClose用来关闭菜单
        directives: {
            clickoutside: {
                bind: function (el, binding, vnode) {
                    function documentHandler(e) {
                        if (el.contains(e.target)) {
                            return false;
                        }
                        if (binding.expression) {
                            binding.value(e)
                        }
                    }

                    el._vueClickOutside_ = documentHandler;
                    document.addEventListener('click', documentHandler);
                },
                unbind: function (el, binding) {
                    document.removeEventListener('click', el._vueClickOutside_);
                    delete el._vueClickOutside_;
                }
            }
        }

    }
</script>

<style scoped lang="less">
    .showDiv {
        display: block;
    }

    .noShowDiv {
        display: none;
    }


    /*/  作用是取消数据绑定时出现的代码闪烁*/
    [v-cloak] {
        display: none;
    }

    table {
        /*border: 1px solid #e9e9e9;*/
        border-collapse: collapse;
        border-spacing: 0;
        /*/ / 隐藏表格中空单元格上的边框和背景：*/
        empty-cells: show;
    }

    th,
    td {
        padding: 8px 16px;
        /*border: 1px solid #e9e9e9;*/
        text-align: left;
    }

    th {
        background: #f7f7f7;
        color: #5c6b77;
        font-weight: 600;
        white-space: nowrap;
    }

    .menu {
        /*border: 1px solid #ccc;*/
    }

    .dropdown {
        border: 1px solid #e9e9e9;
    }

</style>