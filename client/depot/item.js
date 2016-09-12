Template.item.onCreated(function() {
   this.subscribe("fishDetail", {userid:facc.user()._id,fid:FlowRouter.getQueryParam("id")},{onReady:function(){loading.hide();}});
});
Template.item.helpers({
   fish:function(){
   	return Fish.findOne({_id:FlowRouter.getQueryParam("id")});
   }
});
Template.item.events({
  
});
Template.item.onRendered(function() {
   
});
