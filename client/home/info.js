Template.homeInfo.onCreated(function() {
    this.subscribe("userDetail", facc.user()._id, {
        onReady: function() {
            loading.hide();
        }
    });
});
Template.homeInfo.helpers({
    user: function() {
        return Meteor.users.findOne({
            _id: facc.user()._id
        });
    }
});
Template.homeInfo.events({
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
    }
});