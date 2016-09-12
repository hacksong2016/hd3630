Meteor.methods({
    badgeCount: function(args) {
        for (var i = 0; i < args.badges.length; i++) {
            var bd = args.badges[i];
            for (var j = 0; j < args.users.length; j++) {
                var user = args.users[j];
                var ub = UserBadges.findOne({ userid: user ,badge:bd});
                var bg = Badges.findOne({ alias:bd});
           

                if (ub) {
                    var modi = {};
                    modi["$inc"] = {num: args.num}
                    if(bg.num <= (ub.num + args.num)){
                    	modi["$set"] = {complete: 1}
                    	UserBadges.update({ _id: ub._id }, modi);
                    	Badges.update({_id:bg._id},{$addToSet:{users:args.userid}});
                    }else{
                    	modi["$set"] = {complete: 0}
                    	UserBadges.update({ _id: ub._id }, modi);
                    }
                    
                } else {
                    UserBadges.insert({userid: user ,badge:bd,num:args.num,createAt:new Date(),complete:0 ,rebate:0});
                }
                UserBadgesTrack.insert(args);
            }
        }

    },

});
