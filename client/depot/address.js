Template.address.onCreated(function() {
   this.subscribe("fishDetail", {userid:facc.user()._id,fid:FlowRouter.getQueryParam("id")},{onReady:function(){loading.hide();}});
});
Template.address.helpers({
   fish:function(){
   		return Fish.findOne({_id:FlowRouter.getQueryParam("id")});
   },
});
Template.address.events({
  "click .se-next":function(){
  	var bid = Bills.insert({
  		user:facc.user(),
      timeAt:new Date($("#stime").val()),
  		fish:Fish.findOne({_id:FlowRouter.getQueryParam("id")}),
      address:$("#sarea").val(),
  		createAt:new Date(),
  		status:1,
  		step:1,
  	});
  	FlowRouter.go("/select?id=" + bid);
  }
});
Template.address.onRendered(function() {

});
