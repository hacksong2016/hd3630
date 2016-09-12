Meteor.publish("myfish", function(uid) {
    return [Fish.find({
            userid: uid,
            status: 1
        })
    ];
})
Meteor.publish("travels", function() {
    return Travels.find({});
})
Meteor.publish("fishDetail", function(args) {
    return Fish.find({
        userid: args.userid,
        _id: args.fid,
        status: 1
    });
})
Meteor.publish("fishCooks", function(args) {
    return [
        Fish.find({
            userid: args.userid,
            _id: args.fid,
            status: 1
        }),
        Cooks.find({ status: 1 })
    ];
})

Meteor.publish("billDetail", function(args) {
    return [
        Bills.find({
            _id: args.bid,
            status: 1
        }),
        Goods.find({ status: 1 }),
        Others.find({ status: 1 }),
        Cooks.find({ status: 1 })
    ];
})

Meteor.publish("paimai", function(args) {
    return [
        Paimai.find({
        	endAt:{$gt:new Date()},
        }),
    ];
})

Meteor.publish("paimaiDetail", function(args) {
    return [
        Paimai.find({
        	_id:args.pid,
            status: 1
        }),
    ];
})
Meteor.publish("zhongchou", function(args) {

    return [
        Dinner.find({
        	endAt:{$gt:new Date()},
            status: 1
        }),
    ];
})

Meteor.publish("zhongchouDetail", function(args) {
	var userids = [];
	var dn = Dinner.findOne({
        	_id:args.did,
            status: 1
        });
	for(var i = 0 ; i < dn.users.length;i++){
		userids.push(dn.users[i].userid);
	}
    return [
        Dinner.find({
        	_id:args.did,
            status: 1
        }),
        Meteor.users.find({_id:{$in:userids}})
    ];
})
