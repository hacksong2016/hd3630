Template.yuyue.onCreated(function() {
   this.subscribe("travels", {onReady:function(){loading.hide();}});
});
Template.yuyue.helpers({
   travels:function(){
   	return Travels.find({},{sort:{travelAt:-1}});
   },
   count:function(arr){
   		return arr.length;
   }
});
Template.yuyue.events({
  
});
Template.yuyue.onRendered(function() {
   
});
