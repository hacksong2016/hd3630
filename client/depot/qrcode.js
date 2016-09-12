Template.qrcode.onCreated(function() {
   this.subscribe("fishDetail", {userid:facc.user()._id,fid:FlowRouter.getQueryParam("id")},{onReady:function(){loading.hide();}});
});
Template.qrcode.helpers({
   fish:function(){
   	return Fish.findOne({_id:FlowRouter.getQueryParam("id")});
   },
   shouquan:function(){
   		return "/shouquan?id=" + FlowRouter.getQueryParam("id");
   }
});
Template.qrcode.events({
  
});
Template.qrcode.onRendered(function() {
   
});
