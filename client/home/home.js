Template.home.onCreated(function() {
    this.subscribe("userDetail", facc.user()._id);
    this.subscribe("discuzMyList", facc.user()._id);
    this.subscribe("doctor", facc.user()._id, {
        onReady: function() {
            loading.hide();
        }
    });
});
Template.home.helpers({
    user: function() {
        return Meteor.users.findOne({
            _id: facc.user()._id
        });
    },
    discuzs: function() {
        return Discuzs.find({}, { limit: 2, sort: { "default": -1, "type": -1, orderBy: -1, createAt: -1 } });
    },
    right: function(d) {
        // console.log(d.users);
        // console.log($.inArray(facc.user()._id,d.users));
        return $.inArray(facc.user()._id, d.users) > -1;
    },
    doctor:function(){
        return Doctors.findOne();
    }
});
Template.home.events({
    "change #avatar": function(event) {

        var that = $(event.currentTarget);

        lrz(event.currentTarget.files[0], {
            width: 720
        }).then(function(rst) {
            Meteor.call('homeUpdateAvatar', {
                "uid": facc.user()._id,
                "avatar": rst.base64,
            }, function(error, result) {
                that.parent().css({
                    "background-image": "url(" + rst.base64 + ")"
                });
                facc.setState("avatar", rst.base64);
                alert('头像已更新');
            });

        });
    },
    "click .home-qd": function() {
        $(".home-qd").hide();
        Meteor.call("qiandaook", { uid: facc.user()._id }, function(e, r) {})
    }
});
Template.home.onRendered(function() {

    


});
