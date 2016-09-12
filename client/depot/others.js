Template.others.onCreated(function() {
   this.subscribe("billDetail", {bid:FlowRouter.getQueryParam("id")},{onReady:function(){loading.hide();}});
});
Template.others.helpers({
   bill:function(){
      return Bills.findOne({_id:FlowRouter.getQueryParam("id")});
   },
   hongjiu:function(){
      return Others.find({type:"hongjiu"});
   },
   xuejia:function(){
      return Others.find({type:"xuejia"});
   },
});
Template.others.events({
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
    var others = [];
    $(".se-conf-c").each(function(i,o){
       o = $(o);
       others.push(Others.findOne({_id:o.attr("data-id")}));
    });

    Bills.update({_id:FlowRouter.getQueryParam("id")},{$set:{step:4,"others":others}});
  	FlowRouter.go("/bill?id=" + FlowRouter.getQueryParam("id"));
  }
});
Template.goods.onRendered(function() {
	
});
