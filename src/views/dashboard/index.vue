<template>
    <div>
        这是主页内容
        <div class="index_outer_div">
            <div class="common_div">
                <div>qqqww</div>
                <div>ww</div>
                <div>eeee</div>
                <div>rrrr</div>
                <p class="item-tip">系</p></div>
            <div class="common_div">
                <div>qqqww</div>
                <div>ww</div>
                <div>eeee</div>
                <div>rrrr</div>
                <p class="item-tip">列</p></div>
            <div class="common_div">
                <div>qqqww</div>
                <div>ww</div>
                <div>eeee</div>
                <div>rrrr</div>
                <p class="item-tip">点</p></div>
            <div class="common_div">
                <div>qqqww</div>
                <div>ww</div>
                <div>eeee</div>
                <div>rrrr</div>
                <p class="item-tip">点</p></div>
        </div>
    </div>
</template>

<!--/parameter/query-->
<script>
    export default {
        name: "index"
    }
</script>

<style scoped>
    .index_outer_div {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .common_div {
        border: 1px solid #42b983;
        height: 120px;
        width: 200px;
        margin: 15px;
        position: relative;

    }
    .common_div div{
        text-align: left;
    }

    .item-tip {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        position: absolute;
        width: 80px;
        height: 80px;
        /*bottom: 10px;*/
        /*right: 10px;*/
        bottom: -5px;
        right: 0;
        border: 2px solid #fff;
        border-radius: 100%;
        font-size: 48px;
        -webkit-transform: rotate(-40deg);
        transform: rotate(-40deg);
        opacity: 0.1;
    }

</style>