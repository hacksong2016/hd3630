Template.goods.onCreated(function() {
   this.subscribe("billDetail", {bid:FlowRouter.getQueryParam("id")},{onReady:function(){loading.hide();}});
});
Template.goods.helpers({
   bill:function(){
      return Bills.findOne({_id:FlowRouter.getQueryParam("id")});
   },
   kaiwei:function(){
      return Goods.find({type:"kaiwei"});
   },
   tianpin:function(){
      return Goods.find({type:"tianpin"});
   },
    tang:function(){
      return Goods.find({type:"tang"});
   },
    xiaoshi:function(){
      return Goods.find({type:"xiaoshi"});
   }
});
Template.goods.events({
  "click .se-conf":function(event){
  	var ct = $(event.currentTarget);
    if(ct.hasClass("se-conf-c")){
      ct.removeClass("se-conf-c");
    }else{
      ct.addClass("se-conf-c");
      ct.attr("data-id",this._id);
    }
  },
  "click .se-next":function(){
    var goods = [];
    $(".se-conf-c").each(function(i,o){
       o = $(o);
       goods.push(Goods.findOne({_id:o.attr("data-id")}));
    });

  	var bid = Bills.update({_id:FlowRouter.getQueryParam("id")},{$set:{step:3,"goods":goods}});
  	FlowRouter.go("/others?id=" + FlowRouter.getQueryParam("id"));
  }
});
Template.goods.onRendered(function() {
	
});
