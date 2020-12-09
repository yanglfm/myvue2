<template>
    <div class="outerPathDiv">
        添加页面
        <!--        <div class="titleDiv" style="width: 100%">-->
        <!--            <el-input type="primary" style="width: 150px"></el-input>-->
        <!--            <el-input type="primary" style="width: 150px"></el-input>-->
        <!--        </div>-->

        <div class="thirdDiv">div1111</div>
        <!--        <div ref="dragBox"-->
        <!--             @touchstart="touchstartHandle('dragBox',$event)"-->
        <!--             @touchmove="touchmoveHandle('dragBox',$event)">-->
        <!--            可拖拽元素-->
        <!--        </div>-->
        <!--        <div>-->
        <!--            <draggable v-model="list" @update="dragEnd">-->
        <!--                <div v-for="(item,index) in list"></div>-->
        <!--            </draggable>-->
        <!--        </div>-->
        <div>
            <!-- 拖拽 -->
            <div class="content">
                <draggable v-model="shopList" @update="datadragEnd" :options="{animation:500}">
                    <transition-group class="clearfix">
                        <div v-for="item in shopList" :key="item.id" class="drag-item clearfix"
                             style="border: 1px solid  #42b983">
                            <!--                            <img src="@assets/user/carrot.png" alt/>-->
                            <ul>
                                <li>{{item.name}}</li>
                                <li>ID：{{item.id}}</li>
                                <li>原价{{item.oldPrice}}</li>
                                <li>￥：{{item.price}}</li>
                            </ul>
                        </div>
                    </transition-group>
                </draggable>
            </div>


        </div>
        <div>
            <!-- 拖拽 2.0-->
            <div class="content">
                <draggable @update="datadragEnd" :options="{animation:500}">
                    <!--                    <transition-group class="clearfix">-->
                    <!-- <div v-for="item in shopList" :key="item.id" class="drag-item clearfix"
                          style="border: 1px solid  #42b983">
                         &lt;!&ndash;                            <img src="@assets/user/carrot.png" alt/>&ndash;&gt;
                         <ul>
                             <li>{{item.name}}</li>
                             <li>ID：{{item.id}}</li>
                             <li>原价{{item.oldPrice}}</li>
                             <li>￥：{{item.price}}</li>
                            </ul>
                        </div>-->


                    <div class="activityClass">
                        <span>活动名称</span>
                        <el-input v-model="name"></el-input>
                    </div>
                    <div>
                        <el-select v-model="region" placeholder="请选择活动区域">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </div>
                    <div>
                        <el-col :span="11">
                            <el-date-picker type="date" placeholder="选择日期" v-model="date1"
                                            style="width: 100%;"></el-date-picker>
                        </el-col>
                        <el-col class="line" :span="2">-</el-col>
                        <el-col :span="11">
                            <el-time-picker placeholder="选择时间" v-model="date2" style="width: 100%;"></el-time-picker>
                        </el-col>
                    </div>
                    <div>
                        <el-checkbox-group v-model="type">
                            <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                            <el-checkbox label="地推活动" name="type"></el-checkbox>
                            <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                            <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
                        </el-checkbox-group>

                    </div>


                    <div>
                        <el-radio-group v-model="resource">
                            <el-radio label="线上品牌商赞助"></el-radio>
                            <el-radio label="线下场地免费"></el-radio>
                        </el-radio-group>
                    </div>

                    <div>
                        <el-input type="textarea" v-model="desc"></el-input>
                    </div>
                    <div>
                        <el-button type="primary" @click="onSubmit">立即创建</el-button>
                        <el-button>取消</el-button>
                    </div>


                </draggable>
            </div>


        </div>
    </div>
</template>

<script>
    import draggable from 'vuedraggable'

    export default {
        name: "index",
        components: {
            draggable
        },
        data() {
            return {

                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: '',

                select: '',
                list: [],
                shopList: [
                    {
                        id: 11111,
                        name: "哈阿达哈",
                        oldPrice: 152,
                        price: 55
                    },
                    {
                        id: 151,
                        name: "有哈",
                        oldPrice: 155,
                        price: 55
                    },
                    {
                        id: 1515,
                        name: "哈哈哈",
                        oldPrice: 152,
                        price: 55
                    },
                    {
                        id: 1511,
                        name: "的是哈",
                        oldPrice: 152,
                        price: 55
                    },
                    {
                        id: 888811,
                        name: "根深蒂固哈",
                        oldPrice: 152,
                        price: 55
                    }
                ],
            }
        },
        methods: {

            dragEnd(e) {
                e.preventDefault();//通知 Web 浏览器不要执行与事件关联的默认动作
                console.log(e.oldIndex)//拖动前index
                console.log(e.newIndex)//拖动后index
            },
            getdata(evt) {
                console.log(evt.draggedContext.element.text);
            },
            datadragEnd(evt) {
                evt.preventDefault();
                console.log("拖动前的索引 :" + evt.oldIndex);
                console.log("拖动后的索引 :" + evt.newIndex);
                console.log(this.shopList);
                //重新写入服务器中？？
            },
            onSubmit() {
                console.log('submit!');
            }
        }, mounted() {
            //为了防止火狐浏览器拖拽的时候以新标签打开，此代码真实有效
            document.body.ondrop = function (event) {
                event.preventDefault();
                event.stopPropagation();
            };
        }

    }
</script>

<style scoped>
    .outerPathDiv {
        display: flex;
        flex-direction: column;
    }

    .content {
        display: flex;
        flex-direction: column;
    }

    .activityClass {
        display: flex;
        flex-direction: row;
    }
</style>