//仅APP状态下使用
if (Meteor.isCordova) {
    //客户端打开时注册推送服务
    Meteor.startup(function() {
        
        //是否开启调试模式，建议在必要时开启
        jPushPlugin.setDebugModeFromIos();
        //初始化极光推送，必要！
        jPushPlugin.init();
        //获取设备的注册ID
        jPushPlugin.getRegistrationID(function(data) {
            try {
                //获取设备注册信息后的处理
                console.log("JPushPlugin:registrationID is " + data);
                //更新本地存储
                localStorage.setItem("JPUSH_RID", data);
                //更新服务端存储
                if (facc.isGuest()) {

                    jPushPlugin.setTagsWithAlias(["游客"], "游客");
                } else {
                    Meteor.call("updateJpushRegistrationID", {
                        userid: facc.user()._id,
                        id: data
                    }, function(err, tags) {

                        //为用户添加标签及别名&接受服务的设置，这里可以在服务器端判断用户标签，方便更新后台后增加标签，不用重新发布

                        tags.push(device.platform);
                        jPushPlugin.setTagsWithAlias(tags, facc.user().nickname);

                    });

                }
            } catch (exception) {
                console.log(exception);
            }
        });

        //重置角标
        jPushPlugin.setApplicationIconBadgeNumber(0);

    });
}
//坚听打开事件默认获取url参数进行跳转
document.addEventListener("jpush.openNotification", function(event) {
    //重置角标
    jPushPlugin.setApplicationIconBadgeNumber(0);
    var url = "";
    if (device.platform == "Android") {
        url = window.plugins.jPushPlugin.openNotification.extras.url ? window.plugins.jPushPlugin.openNotification.extras.url : "/";
    } else {
        url = event.url ? event.url : "/";
    }
    FlowRouter.go(url);
}, false);

//需要注册 jpush.setTagsWithAlias 事件来监听设置结果:
document.addEventListener("jpush.setTagsWithAlias", function(event) {
    try {
        console.log("onTagsWithAlias", event);
    } catch (exception) {
        console.log(exception);
    }
}, false);

