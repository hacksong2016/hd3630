/***
 ** 统一支付接口
 ** 已集成：支付宝支付（alipay）｜微信支付（wechat）
 ** 根据环境自动适应支付环境
 ** 1、APP根据支付配置的config自动选择支付方式或在屏幕下方弹出选择支付方式
 ** 2、WEBAPP自动根据环境选择支付方式：
 ** 1）微信端自动使用微信支付
 ** 2）浏览器打开自动使用支付宝
 ** 参数说明
 ** info = {
 **         subject: "付款单名称",
 **         body: "付款单说明",
 **         price: "付款单价格,单位：元", //price|balance|point 最少存在一种
 **         balance: "付款单价格,单位：余额",
 **         point: "付款单价格,单位：积分",
 **         way: "付款方式 ALIPAY|WECHAT",
 **         data: {付款单附带数据},
 **         
 ** }
 **
 **
 ***/
Pay = {
    //跳转到支付页面，由于微信对于SPA项目的支持不好所以才用此方式跳转
    go: function(url) {
        if (Session.get("FRUID")) {
            url += "&fruid=" + Session.get("FRUID");
        }
        if (Session.get("CURSTATE")) {
            url += "&curstate=" + Session.get("CURSTATE");
        }
        // console.log(Session.get("FRUID"));
        // console.log(url);
        window.location.href = url;
    },
    //付款借口
    exec: function(info, fn) {

        if (Pay._checkPayInfo(info) && Pay._checkLogin()) {

            //设置当前支付回调
            Pay._callback = fn;
            //根据配置在服务端生成付款单
            Meteor.call("createPay", Pay._createPay(info), function(err, pay) {

                if (pay == "POINT") {
                    //积分不足
                    Pay._callback("POINT");

                } else if (pay == "BALANCE") {
                    //余额不足
                    Pay._callback("BALANCE")

                } else if (pay.price > 0) {
                    //需要进行现金支付
                    if (Meteor.isCordova) {
                        //客户端支付
                        if ((pay.way == "") && payConfig.app.alipay && payConfig.app.wechat) {
                            //支付宝和微信支付

                            $(".payBg").show();

                        } else if (payConfig.app.alipay) {
                            //设置支付方式
                            pay.way = "ALIPAY";
                            //支付宝支付
                            alipay.pay(pay, function(result) {
                                Pay._payback(pay, result);
                            });

                        } else if (payConfig.app.wechat) {
                            //设置支付方式
                            pay.way = "WECHAT";

                            //微信支付
                            wechat.appPay(pay, function(result) {
                                Pay._payback(pay, result);
                            });

                        } else {

                            console.log("未接入第三方支付");
                        }

                    } else {
                        //WEBAPP
                        if (wechat.isWeiXin() && payConfig.webapp.wechat) {
                            //设置支付方式
                            pay.way = "WECHAT";
                            //微信支付
                            wechat.pay(pay, function(result) {
                                Pay._payback(pay, result);
                            });

                        } else if (payConfig.webapp.alipay) {
                            //设置支付方式
                            pay.way = "ALIPAY";

                            //支付宝支付
                            console.log("敬请期待：WEBAPP－ALIPAY");
                        } else {

                            console.log("未接入第三方支付");
                        }

                    }
                } else {
                    //不需要进行现金支付
                    Meteor.call("payComplete", { "pay": pay, "result": "nocash" }, function(err, msg) {
                        Pay._callback("OK", pay);
                    });
                }
            });
        }
    },
    _payback: function(pay, result) {
        if (result) {
            Meteor.call("payComplete", { "pay": pay, "result": result }, function(err, msg) {
                Pay._callback("OK", pay);
            });
        } else {
            Pay._callback("ERROR");
        }

    },
    //关闭调用
    hidePaySelect: function() {
        $(".payBg").hide();
    },
    //回调函数
    _callback: function() {},
    //根据基本信息生成基本付款单信息
    _createPay: function(info) {
        //当前用户名
        info.userid = facc.user()._id;
        //推荐人信息 
        info.fruid = Session.get("FRUID");
        //帐户本次访问状态 INREG:本次访问完成登录
        info.curstate = Session.get("CURSTATE");
        //付款方式
        info.way = info.way ? info.way : "";

        //补全价格／余额／积分
        info.price = info.price ? info.price * 1 : 0;
        info.balance = info.balance ? info.balance * 1 : 0;
        info.point = info.point ? info.point * 1 : 0;

        return info;

    },
    //检查付款单基本信息完整性
    _checkPayInfo: function(info) {
        if (!info.subject) {
            console.log("请填写付款单名称");
            return false;
        }
        if (!info.body) {
            console.log("请填写付款单说明");
            return false;
        }
        if ((typeof info.price == undefined) || (typeof info.balance == undefined) || (typeof info.point == undefined)) {
            console.log("请填写付款单支付价格|余额|积分其中之一");
            return false;
        }
        if (!info.data) {
            console.log("请填写付款单附加信息");
            return false;
        }
        return true;
    },
    //验证是否登录
    _checkLogin: function() {

        // if (facc.isGuest()) {
        //     FlowRouter.go("/login");
        //     return false;
        // }
        return true;
    },

}
