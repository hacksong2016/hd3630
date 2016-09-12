Meteor.methods({
    accountRegisterGetCode: function(args) {
        if ((args.tel == "") || !facc.checkTel(args.tel)) {
            return "ERROR_UNKONE";
        }

        var user = Meteor.users.findOne({
            tel: args.tel
        });

        if (user) {
            return "ERROR_REPEAT_TEL";
        }

        user = Meteor.users.findOne({
            username: args.username
        });

        if (user) {
            return "ERROR_REPEAT_NICK";
        }

        this.unblock();

        var code = parseInt(Math.random() * 1000000);

        VaildCodes.insert({
            "account": args.tel,
            "username": args.username,
            "password": args.password,
            "code": code + "",
            "invite":args.inviteFrom
        });


        sms.send(args.tel, args.username + ",您好:\n您的验证码是：" + code + ".请尽快登录，勿将此信息透露给他人。");

        return code;
        // return "SUCCESS";
    },
    accountRegisterWithCode: function(args) {
        if (args.code == "") {
            return "ERROR_UNKONE";
        }
        var vc = VaildCodes.findOne({
            "code": args.code + ""
        });
        if (!vc) {
            return "ERROR_NONE";
        }

        var user = Meteor.users.findOne({
            tel: vc.account
        });

        if (user) {
            return "ERROR_REPEAT_TEL";
        }

        user = Meteor.users.findOne({
            username: vc.username
        });

        if (user) {
            return "ERROR_REPEAT_NICK";
        }

        salt = parseInt(Math.random() * 1000000) + "";
        salt = CryptoJS.MD5(salt).toString();
        var md5 = CryptoJS.MD5(vc.password + salt).toString();


        //处理邀请人
        var invite = "";
        var inviteName = "";
        if(vc.invite){
            var invuser = Meteor.users.findOne({tel:vc.invite});
            if(invuser){
                invite = invuser._id;
                inviteName = invuser.nickname;
            }
        }

        user = {
            "nickname": vc.username,
            "username": vc.username,
            "password": md5,
            "salt": salt,
            "email": "",
            "vaildEmail": false,
            "tel": vc.account,
            "avatar": "/avatar.png",
            "point": 0,
            "balance": 0,
            "isadmin": 0,
            "createAt": new Date(),
            "role":"member",
            "vaild":0,
            level:3,
            desc:"这是对于认证会员的介绍",
            "invite":invite,
            "inviteName":inviteName
        };

        var uid = Meteor.users.insert(user, facc.insert);

        if (facc.needAdmin == 1) {
            return "ERROR_RIGHT";
        }

        this.setUserId(uid);

        VaildCodes.remove(vc._id);


        Fish.insert({
            fname:"深海金枪鱼",
            fcreateAt:new Date(),
            fwhere:"中国－南沙暗礁",
            uname:user.nickname,
            utel:user.tel,
            uavatar:user.avatar,
            users:[
                {
                    name:user.nickname,
                    tel:user.tel,
                    avatar:user.avatar,
                    createAt:new Date(),
                }
            ],
            fthumb:"/hd1.png",
            ftemp:60,
            fkg:12.5,
            userid:uid,
             status:1,
             lock:0,
        });
        Fish.insert({
            fname:"深海金枪鱼",
            fcreateAt:new Date(),
            fwhere:"中国－南沙暗礁",
            uname:user.nickname,
            utel:user.tel,
            uavatar:user.avatar,
            users:[
                {
                    name:user.nickname,
                    tel:user.tel,
                    avatar:user.avatar,
                    createAt:new Date(),
                }
            ],
            fthumb:"/hd2.png",
            ftemp:60,
            fkg:22.5,
            userid:uid,
            status:1,
            lock:0,
        });
        Fish.insert({
            fname:"深海章红",
            fcreateAt:new Date(),
            fwhere:"中国－南沙暗礁",
            uname:user.nickname,
            utel:user.tel,
            uavatar:user.avatar,
            users:[
                {
                    name:user.nickname,
                    tel:user.tel,
                    avatar:user.avatar,
                    createAt:new Date(),
                }
            ],
            fthumb:"/hd3.png",
            ftemp:60,
            fkg:44.3,
            userid:uid,
             status:1,
             lock:0,
        });

        return {
            "_id": uid,
            "nickname": user.nickname,
            "avatar": user.avatar
        };
    },
    accountLoginWithTel: function(args) {
        console.log(args);
        if ((args.tel == "") || !facc.checkTel(args.tel)) {
            return "ERROR_UNKONE";
        }

        var user = Meteor.users.findOne({
            tel: args.tel
        });

        if (!user) {
            return "ERROR_NONE";
        }

        if ((facc.needAdmin == 1) && (user.isadmin != 1)) {
            return "ERROR_RIGHT";
        }

        salt = user.salt;

        var md5 = CryptoJS.MD5(args.password + salt).toString();

        if (md5 != user.password) {
            return "ERROR_PWD";
        }

        this.setUserId(user._id);

        return {
            "_id": user._id,
            "nickname": user.nickname,
            "avatar": user.avatar
        };
    },
    accountForget: function(args) {

        if ((args.tel == "") || !facc.checkTel(args.tel)) {
            return "ERROR_UNKONE";
        }

        var user = Meteor.users.findOne({
            tel: args.tel
        });

        if (!user) {
            return "ERROR_NONE";
        }

        this.unblock();

        var code = parseInt(Math.random() * 1000000);

        VaildCodes.insert({
            "account": args.tel,
            "code": code + ""
        });


        sms.send(args.tel, user.nickname + ",您好:\n您的验证码是：" + code + ".请尽快登录，勿将此信息透露给他人。");

        return "SUCCESS";
    },
    accountLoginWithCode: function(args) {

        if (args.code == "") {
            return "ERROR_UNKONE";
        }
        var vc = VaildCodes.findOne({
            "code": args.code + ""
        });

        if (!vc) {
            return "ERROR_NONE";
        }

        var user = Meteor.users.findOne({
            tel: vc.account
        });


        if (!user) {
            return "ERROR_NONE";
        }

        if ((facc.needAdmin == 1) && (user.isadmin != 1)) {
            return "ERROR_RIGHT";
        }

        this.setUserId(user._id);

        VaildCodes.remove(vc._id);

        return {
            "_id": user._id,
            "nickname": user.nickname,
            "avatar": user.avatar
        };
    },
    test:function(){
        var s = "sfd"*1;
        console.log(isNaN(s))
    }

});
