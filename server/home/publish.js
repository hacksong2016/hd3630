Meteor.publish("userDetail", function(uid) {

    return Meteor.users.find({
        _id: uid
    }, {
        fields: {
        	nickname:1,
            username: 1,
            email: 1,
            vaildEmail:1,
            tel: 1,
            avatar: 1,
            point: 1,
            balance: 1,
            isadmin: 1,
            createAt: 1,
            invite:1,
            photo:1,
        }
    });
});

Meteor.publish("myTracks", function(uid) {
   
    var fd = {
           income:1,
           balance:1,
           tel:1,
           nickname:1
        };

    return [Meteor.users.find({
        _id: uid
    }, {
        fields:fd 
    }),
    Tracks.find({
        userid: uid
    })];
});