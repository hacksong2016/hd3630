Template.shouquan.onCreated(function() {
   this.subscribe("fishDetail", {userid:facc.user()._id,fid:FlowRouter.getQueryParam("id")},{onReady:function(){loading.hide();}});
});
Template.shouquan.helpers({
   fish:function(){
   	return Fish.findOne({_id:FlowRouter.getQueryParam("id")});
   }
});
Template.shouquan.events({
  "click .sq-btn":function(){
  	loading.show();
  	 Fish.update({_id:FlowRouter.getQueryParam("id")},{$set:{
  	 		uname:facc.user().nickname,
            userid:facc.user()._id,
            uavatar:facc.user().avatar,
  	 },$addToSet:{
  	 	users:{
  	 		name:facc.user().nickname,
            serid:facc.user()._id,
            avatar:facc.user().avatar,
            createAt:new Date(),
  	 	}
  	 }});
  	 FlowRouter.go("/depot");
  }
});
Template.shouquan.onRendered(function() {
   
});
