Template.homeTrack.onCreated(function() {
    this.subscribe("myTracks", facc.user()._id, {
        onReady: function() {
            loading.hide();
        }
    });
    this.subscribe("userDetail", facc.user()._id);
});
Template.homeTrack.helpers({
    tracks: function() {
        return Tracks.find({}, { sort: { createAt: -1 } }).fetch();
    },
    user: function() {
        return Meteor.users.findOne({
            _id: facc.user()._id
        });
    },
    all: function() {
        var u = Meteor.users.findOne({ _id: facc.user()._id });
        return (u && u.income) ? u.income : 0;
    },
    pointk: function() {

        var u = Meteor.users.findOne({ _id: facc.user()._id });

        return (u && u.balance) ? u.balance : 0;
    },
    pointType: function() {
        return this.balance > 0 ? "收入" : "支出";
    },
    pointType2: function() {
        return this.balance < 0 ? "花费" : "获得";
    },
    abs: function() {
        return Math.abs(this.balance);
    }
});
Template.homeTrack.events({
    "click #ht-bar-btn2": function() {
        if(!$("#tx").val()){
            alert("请填写充值金额");
            return false;
        }

        if (Meteor.isCordova) {
            loading.show();
            Meteor.call("createCashPay", { userid: facc.user()._id, cash: $("#tx").val() * 1 }, function(err, res) {
                window.alipay.pay({
                    tradeNo: res._id,
                    subject: "云医联盟充值",
                    body: "云医联盟充值",
                    price: res.cash,
                    notifyUrl: "http://mfynotify.yigonglue.com/alipay"
                }, function(successResults) {
                    if (successResults.resultStatus == "9000") {
                        var objs = parseJson(successResults.result)
                        Meteor.call("paySuccess", objs, function(err, res) {
                            Tracks.insert({
                                userid: facc.user()._id,
                                balance: res.cash,
                                createAt: new Date(),
                                status: 1,
                                desc: "通过支付宝充值",
                                type: "CHARGE",
                                typeName: "用户充值",

                            });
                            alert("付款成功");
                            loading.hide();
                        });
                    } else {
                        loading.hide();
                    }
                }, function(errorResults) {
                    console.log(errorResults)
                    loading.hide();
                });
            });

        } else {
            alert("请在“云医联盟”客户端支付～")
        }
    },
    //activeSimple
    "click #openInput": function() {
        $(".ht-bar-w").toggle();
    },
    "click #ht-bar-btn": function() {
         if(!$("#tx").val()){
            alert("请填写提现金额");
            return false;
        }
        var v = $("#tx").val();
        var u = Meteor.users.findOne({ _id: facc.user()._id });
        if ((v > 0)) {
            if ((u.balance >= v)) {
                Applys.insert({
                    userid: facc.user()._id,
                    name: facc.user().nickname,
                    tel: u.tel,
                    balance: v,
                    createAt: new Date(),
                    status: 1,
                    check: 0,
                });
                Tracks.insert({
                    userid: facc.user()._id,
                    balance: v,
                    createAt: new Date(),
                    status: 1,
                    desc: "提交提现申请",
                    type: "APPLY",
                    typeName: "提现申请",

                });
                alert("申请已提交");
            } else {
                alert("余额不足")
            }

        }
        $(".ht-bar-w").toggle();
    },
})
