Template.homeSuggest.onRendered(function() {
   this.subscribe("userDetail", facc.user()._id, {
        onReady: function() {
            loading.hide();
        }
    });
});
Template.homeSuggest.events({

    "click #pa-create": function() {
    	var user = Meteor.users.findOne({_id:facc.user()._id});
        var obj = {
            "detail": $("#pa-detail").val(),
            "createAt": new Date(),
            "nickname": facc.user().nickname,
            userid: facc.user()._id,
            avatar: facc.user().avatar,
            status:1,
            tel:user.tel,
        };

        Suggests.insert(obj);

      	alert("感谢你的反馈建议,我们会持续跟进");

      	FlowRouter.go("/home");
    }
});