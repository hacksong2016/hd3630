Meteor.methods({

    homeUpdateUserNickname: function(args) {
        Meteor.users.update({
            _id: args.uid
        }, {
            $set: {
                nickname: args.value
            }
        });
    },

    homeUpdateAvatar: function(args) {
        upload(args.avatar, function(data) {
            Meteor.users.update({
                _id: args.uid
            }, {
                $set: {
                    "avatar": data
                }
            });

            Dentists.update({
                userid: args.uid
            }, {
                $set: {
                    avatar: data
                }
            });
        }, function(e) {
            throw e;
        });
    },

    homeUpdatePhoto: function(args) {
        upload(args.photo, function(data) {
            Meteor.users.update({
                _id: args.uid
            }, {
                $set: {
                    "photo": data
                }
            });

            Dentists.update({
                userid: args.uid
            }, {
                $set: {
                    photo: data
                }
            });
        }, function(e) {
            throw e;
        });
    },


    homeUpdateUserPassword: function(args) {
        var uid = args.uid;
        var pwd = args.pwd;

        var user = Meteor.users.findOne({
            _id: uid
        });
        var md5 = CryptoJS.MD5(pwd + user.salt).toString();
        Meteor.users.update({
            _id: uid
        }, {
            $set: {
                password: md5
            }
        });
    },
    createCashPay:function(args){
        var rid = Recharge.insert({
            userid:args.userid,
            cash:args.cash,
            createAt:new Date(),
            ispay:0,

        });
        return Recharge.findOne({_id:rid});
    },
    paySuccess:function(args){

        Recharge.update({_id:args.out_trade_no},{$set:{
            ispay:1,
            cash:args.price,
            data:args,
            payAt:new Date(),

        }})

        return "SUCCESS";
    }
   
});
