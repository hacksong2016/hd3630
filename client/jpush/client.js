/*
//发送本地通知
jpush.local({
            content:"testcontent",//内容
            title:"testtitle",//标题
            url:"/",//点击后跳转url(使用FlowRouter.go跳转，项目内跳转地址以"/"开头)
            badge:0,//现实角标磨人＋1
            delay:0,//延迟推送时间最少1 0会自动＋1
        });
*/
jpush = {
    //发送消息
    local: function(msg) {
        if (Meteor.isCordova && jpush._check(msg)) {

            if (device.platform == "Android") {
                //安卓本地推送
                jPushPlugin.addLocalNotification(1, msg.content, msg.title, "local" + Math.random(), msg.delay * 1000, { "url": msg.url })
            } else {
                console.log(msg);
                //苹果本地即时推送
               jPushPlugin.addLocalNotificationForIOS((msg.delay ? msg.delay : (msg.delay+1)), msg.content, msg.badge, "local" + Math.random(), { "url": msg.url });
            }
        }
    },
    server: function(msg) {
        if (jpush._check(msg)) {

            //配置一些信息
            msg.regid = localStorage.getItem("JPUSH_RID");
            msg.createAt = new Date();
            msg.status = 0;
            msg.sendAt = new Date(new Date().getTime() + msg.delay * 1000);

            //调用方法加入服务器发送队列
            Meteor.call("jpushServerPush", msg);
        }
    },
    _check: function(msg) {
        // if (!msg.type) {
        //     console.log("需要制定是SERVER还是LOCAL");
        //     return false;
        // }
        if (!msg.content) {
            console.log("请填写推送内容");
            return false;
        }
        if (!msg.title) {
            console.log("ANDROID平台需要标题");
            return false;
        }
        if (!msg.url) {
            console.log("请设置跳转方向");
            return false;
        }
        // if (!msg.userid && !msg.regid) {
        //     console.log("请设置用户ID 或 设备注册ID");
        //     return false;
        // }
        if (isNaN(msg.badge * 1)) {
            console.log("请设置IOS提示角标，0为取消");
            return false;
        }
        if (isNaN(msg.delay * 1)) {
            console.log("请设置延时时间，单位秒");
            return false;
        }
        return true;
    }
}
