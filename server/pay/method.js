/***
 ** 统一支付接口-服务端
 ** 参数说明
 ** pays = {
 **         subject: "付款单名称",
 **         body: "付款单说明",
 **         price: "付款单价格,单位：元", price|balance|point 最少存在一个
 **         balance: "付款单价格,单位：余额",
 **         point: "付款单价格,单位：积分",
 **         data: {付款单附带数据},
 **         createAt: "付款单创建时间",
 **         status: "付款单状态",
 **         paystatus: "支付状态",
 **         username: "支付者昵称",
 **         userid: "支付者ID",
 **         fruid: "推荐者ID",
 **         curstate: "本次支付访问状态 INREG:本次访问完成登录",
 **         way: "支付方式",
 ** }
 **
 **
 ***/
Meteor.methods({
    //生成付款单
    createPay: function(args) {
        if (args.userid) {
            var user = Meteor.users.findOne({ _id: args.userid });
            //检查余额
            if (args.balance > 0) {
                var user_balance = user.balance ? user.balance : 0;
                if (user_balance < args.balance) {
                    return "BALANCE";
                }
            }
            //检查积分
            if (args.point > 0) {
                var user_point = user.point ? user.point : 0;
                if (user_point < args.point) {
                    return "POINT";
                }
            }

            //设置其它信息
            args.createAt = new Date();
            args.status = 1;
            args.username = user.nickname;

            //如果无现金支付
            if (args.price == 0) {
                //余额支付
                if (args.balance > 0) {
                    args.way = "BALANCE";
                    args.payAt = new Date();
                }
                //积分余额
                if (args.point > 0) {
                    args.way = "POINT";
                    args.payAt = new Date();
                }
            } else {
                args.paystatus = 0;
            }

            //插入付款单
            var payid = Pays.insert(args);
            args._id = payid;

            return args;
        } else {
            //设置其它信息
            args.createAt = new Date();
            args.status = 1;
            args.way = "BALANCE";
            args.payAt = new Date();
            var payid = Pays.insert(args);
            args._id = payid;

            return args;
        }

    },
    //现金付款完成
    payComplete: function(args) {
        var pay = Pays.findOne({ _id: args.pay._id });
        console.log(pay);

        if (pay.userid) {
            var user = Meteor.users.findOne({ _id: pay.userid });
            //检查余额
            if (pay.balance > 0) {

                var user_balance = user.balance ? user.balance : 0;

                if (user_balance < pay.balance) {

                    Pays.update({
                        _id: pay._id
                    }, {
                        $set: {
                            payAt: new Date(),
                            paystatus: 1,
                            tradeno: args.result,
                            way: args.pay.way,
                            error: "BALANCE",
                        }
                    });
                    //出现余额不足则现金计入余额
                    Meteor.users.update({
                        _id: user._id
                    }, {
                        $inc: {
                            balance: (pay.price * 1)
                        }
                    });
                    return "BALANCE";
                } else {
                    Meteor.users.update({
                        _id: user._id
                    }, {
                        $inc: {
                            balance: (pay.balance * -1)
                        }
                    });
                }
            }
            //检查积分
            if (pay.point > 0) {
                var user_point = user.point ? user.point : 0;
                if (user_point < pay.point) {

                    Pays.update({
                        _id: pay._id
                    }, {
                        $set: {
                            payAt: new Date(),
                            paystatus: 1,
                            tradeno: args.result,
                            way: args.pay.way,
                            error: "POINT",
                        }
                    });
                    //出现余额不足则现金计入余额
                    Meteor.users.update({
                        _id: user._id
                    }, {
                        $inc: {
                            balance: (pay.price * 1)
                        }
                    });
                    return "POINT";
                } else {
                    Meteor.users.update({
                        _id: user._id
                    }, {
                        $inc: {
                            point: (pay.point * -1)
                        }
                    });
                }
            }

            //处理付款单
            Pays.update({
                _id: pay._id
            }, {
                $set: {
                    payAt: new Date(),
                    paystatus: 1,
                    way: args.pay.way,
                    tradeno: args.result,
                }
            });

            return "OK";
        } else {
            //处理付款单
            Pays.update({
                _id: pay._id
            }, {
                $set: {
                    payAt: new Date(),
                    paystatus: 1,
                    way: args.pay.way,
                    tradeno: args.result,
                }
            });
        }

    }
});
