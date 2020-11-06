//单页找控件点击

var getTaoJinBi=text('领淘金币').findOnce()
getTaoJinBi.click()

text('赚金币').findOnce().click()

var u = text('浏览10s 立得').find()

/*为啥已经做了限制，只查找浏览10s的，还是一直点进去充值中心？？？*/
var e = u.length - 1


toast('存在' + e);

for (var i = 1; i < e; i++) {
    var tv = u[i];

    if (tv) {
        //获取其中心位置并点击
        var tr = tv.bounds()

        toast('存在tv--' + tv+'---tr---'+tr);
        click(tr.centerX(), tr.centerY());
        sleep(1500)
        toast('第' + i + '个\'浏览10s 立得\'按钮');
        viewWeb(15)
        sleep(1500)
    }
}

/**
 * 业务有点多，需要分类操作
 * @param time
 */

function viewWeb(time) {
    gesture(1000, [300, 600], [300, 300]);
    var cnt = 1;
    while (true) {
        var finish = desc("任务已完成").exists() || textStartsWith("任务完成").exists();

        if (finish || cnt > time) {
            break;
        }
        sleep(1000);
        cnt += 1;
    }
    //模拟返回键，返回到任务栏页面
    back();
}


//多页找控件点击

/*
for(var r=0;r<3;r++){
    var u=id ('aus').find()

    var e=u.length-1

    log(e)

    for(var i=1;i<e;i++){
        var tv=u[i];

        if(tv){
            var tr=tv.bounds()

            click(tr.centerX(),tr.centerY());

            sleep(1500)

            log('点击了'+i+'次');

            back();

            sleep(1500)

        }

    }

    className ('android.support.v7.widget.RecyclerView') .scrollForward()

    sleep(2500)

}*/
