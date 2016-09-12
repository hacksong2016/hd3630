Template.bill.onCreated(function() {
    this.subscribe("billDetail", { bid: FlowRouter.getQueryParam("id") }, { onReady: function() { loading.hide(); } });
});
Template.bill.helpers({
    bill: function() {
        return Bills.findOne({ _id: FlowRouter.getQueryParam("id") });
    },
});
Template.bill.events({
    "click .se-next": function() {
        var bl = Bills.findOne({ _id: FlowRouter.getQueryParam("id") });
        if(bl){
          Bills.update({_id:FlowRouter.getQueryParam("id")},{$set:{step:5}});
          Fish.update({_id:bl.fish._id},{$set:{orderAt:new Date(),lock:3,bill:bl._id}})
        }
        
    }
});
Template.bill.onRendered(function() {

});
