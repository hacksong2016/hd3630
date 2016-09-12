Template.zhongchou.onCreated(function() {
   this.subscribe("fishDetail", {userid:facc.user()._id,fid:FlowRouter.getQueryParam("id")},{onReady:function(){loading.hide();}});
});
Template.zhongchou.helpers({
   fish:function(){
   	return Fish.findOne({_id:FlowRouter.getQueryParam("id")});
   }
});
Template.zhongchou.events({
  "click .se-next":function(){
  	
    if(!$("#stime").val()){
      alert("请填写晚宴时间");
      return;
    }
    if(!$("#sprice").val()){
      alert("请填写众筹价格");
      return;
    }
    if(!$("#snum").val()){
      alert("请填写拟邀人数");
      return;
    }
    loading.show();
  	var did = Dinner.insert({
      fish:Fish.findOne({_id:FlowRouter.getQueryParam("id")}),
      endAt:new Date($("#stime").val()),
      price:$("#sprice").val(),
      address:$("#saddress").val(),
      num:$("#snum").val(),
      nowPrice:0,
      users:[],
      userid:facc.user()._id,
      nickname:facc.user().nickname,
      avatar:facc.user().avatar,
      status:1,
    }); 
    Fish.update({_id:FlowRouter.getQueryParam("id")},{$set:{zhongchou:did,lock:2}});
  	FlowRouter.go("/zhongchou/list");
  }
});
Template.zhongchou.onRendered(function() {
   
});
