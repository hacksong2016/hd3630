Template.paimai.onCreated(function() {
   this.subscribe("fishDetail", {userid:facc.user()._id,fid:FlowRouter.getQueryParam("id")},{onReady:function(){loading.hide();}});
});
Template.paimai.helpers({
   fish:function(){
   	return Fish.findOne({_id:FlowRouter.getQueryParam("id")});
   }
});
Template.paimai.events({
  "click .se-next":function(){
  	loading.show();
    if(!$("#stime").val() || !$("#sbegin").val() ){
      alert("请填写值");
      return;
    }
  	var pid = Paimai.insert({
      fish:Fish.findOne({_id:FlowRouter.getQueryParam("id")}),
      endAt:new Date($("#stime").val()),
      startPrice:$("#sbegin").val(),
      nowPrice:0,
      status:1,
      users:[],

    }); 
    Fish.update({_id:FlowRouter.getQueryParam("id")},{$set:{paimai:pid,lock:1}});
  	FlowRouter.go("/paimai/list");
  }
});
Template.paimai.onRendered(function() {
   
});
