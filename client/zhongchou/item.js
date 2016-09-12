Template.zhongchouItem.onCreated(function() {
    this.subscribe("zhongchouDetail", { userid: facc.user()._id, did: FlowRouter.getQueryParam("id") }, { onReady: function() { loading.hide(); } });
});
Template.zhongchouItem.helpers({
    dinner: function() {
        return Dinner.findOne({ _id: FlowRouter.getQueryParam("id") });
    },
    checkPrice: function() {
        var dn = Dinner.findOne({ _id: FlowRouter.getQueryParam("id") });
        if (dn && dn.users) {
            var us = dn.users;
            for (var i = 0; i < us.length; i++) {
                var u = us[i];
                if (u.userid == facc.user()._id) {
                    return true;
                }
            }
        }
        return false;
    },
 
    checkUnit:function(){
        var dn = Dinner.findOne({ _id: FlowRouter.getQueryParam("id") });
        if(dn){
            return parseInt(dn.price / dn.num);
        }else{
            return "-";
        }
        
    },
    user:function(){
        return Meteor.users.findOne({_id:this.userid})
    }
});
Template.zhongchouItem.events({
    "click .se-next": function() {

        var dn = Dinner.findOne({ _id: FlowRouter.getQueryParam("id") });
      
        loading.show();

        Dinner.update({ _id: FlowRouter.getQueryParam("id") }, {
            $addToSet: {
                users: {
                    userid: facc.user()._id,
                    price: parseInt(dn.price / dn.num),
                    createAt: new Date(),
                    nickname: facc.user().nickname,
                    avatar: facc.user().avatar,
                }
            }
        });
        alert("已付款请按时参加晚宴");
        FlowRouter.go("/zhongchou/list");
    }
});
Template.zhongchouItem.onRendered(function() {

});
