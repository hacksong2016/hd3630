Template.depot.onCreated(function() {
    this.subscribe("myfish", facc.user()._id, { onReady: function() { loading.hide(); } });
});
Template.depot.helpers({
    fishes: function() {
        return Fish.find({}, { sort: { createAt: -1 } });
    },
    check: function() {
        if (this.lock == 3) {
            return "/bill?id=" + this.bill;
        } else if (this.lock == 2) {
            return "/zhongchou/item?id=" + this.zhongchou;
        } else if (this.lock == 1) {
            return "/paimai/item?id=" + this.paimai;
        } else {
            return "/item?id=" + this._id;
        }
    },
    ispaimai: function() {
        return (this.lock == 1);
    },
    iszhongchou: function() {
        return (this.lock == 2);
    },
    isorder: function() {
        return (this.lock == 3);
    },
    isnone: function() {
        return (this.lock == 0);
    }
});
Template.depot.events({

});
Template.depot.onRendered(function() {

});
