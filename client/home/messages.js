Template.homeMessages.onCreated(function() {
    this.subscribe("mymessages", facc.user()._id,{onReady:function(){
        loading.hide();
    }});
});
Template.homeMessages.helpers({
    messages:function(){
    	return Messages.find({});
    },
    ismine:function(){
        return (this.from == facc.user()._id)
    }
});
Template.homeMessages.onRendered(function() {

});
curMsg = null;
Template.homeMessages.events({
    "click .hm-btn":function(){
        curMsg = {
            from:this.from,
            fname:this.fname,
            favatar:this.favatar,
        } 
    $(".d-bg").show();
   },
    "click .d-i-c":function(){
    $(".d-bg").hide();
   },
   "click .sendbtn":function(){
        if(!$("#instant-input").val()){
            alert("请输入内容");
            return false;
        }

        var target = Meteor.users.findOne({_id:FlowRouter.getQueryParam("id")});
        Messages.insert({
            from:facc.user()._id,
            to:curMsg.from,
            fname:facc.user().nickname,
            tname:curMsg.fname,
            favatar:facc.user().avatar,
            tavatar:curMsg.favatar,
            createAt:new Date(),
            content:$("#instant-input").val(),
            read:0,
            status:1
        });
        alert("私信已发送");
        $(".d-bg").hide();
   }

});
