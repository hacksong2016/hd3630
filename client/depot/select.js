Template.select.onCreated(function() {
   this.subscribe("billDetail", {bid:FlowRouter.getQueryParam("id")},{onReady:function(){loading.hide();}});
});
Template.select.helpers({
   fish:function(){
   		return Fish.findOne({_id:FlowRouter.getQueryParam("id")});
   },
   cooks:function(){
   		return Cooks.find();
   },
   checkst:function(){
   		var cc = Session.get("cur_cook");
   		if(this && cc && (this._id == cc._id)){
   			return "se-conf-c";
   		}else{
   			return "";
   		}
   }
});
Template.select.events({
  "click .se-conf":function(){
  	Session.set("cur_cook",this);
  },
  "click .se-next":function(){
  	Bills.update({_id:FlowRouter.getQueryParam("id")},{$set:{step:2,"cook":Session.get("cur_cook")}});
  	FlowRouter.go("/goods?id=" + FlowRouter.getQueryParam("id"));
  }
});
Template.select.onRendered(function() {
	Tracker.autorun(function(){
		Session.set("cur_cook",Cooks.findOne());
	});
});
