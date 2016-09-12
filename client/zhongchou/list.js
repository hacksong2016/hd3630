Template.zhongchouList.onCreated(function() {
    this.subscribe("zhongchou", facc.user()._id, { onReady: function() { loading.hide(); } });
});
Template.zhongchouList.helpers({
    dinners: function() {
        return Dinner.find({}, { sort: { endAt: -1 } });
    },
    check: function() {
        if (this.isorder == 1) {
            return "/bill?id=" + this.bill;
        } else if (this.lock == 1) {
            return "/zhongchou/view?id=" + this.zhongchou;
        } else if (this.lock == 2) {
            return "/paimai/view?id=" + this.paimai;
        } else {
            return "/item?id=" + this._id;
        }
    },
    owner: function() {
        if (this) {
            return this.fish.users[0];
        }
    },
    count: function(arr) {
        return arr ? arr.length : 0;
    },
    checkUnit:function(){
        return parseInt(this.price / this.num);
    },
    checkPrice: function() {
        var us = this.users;
        if (us ) {
            for (var i = 0; i < us.length; i++) {
                var u = us[i];
                if (u.userid == facc.user()._id) {
                    return true;
                }
            }
        }

        return false;
    },
    myprice: function() {
        var us = this.users;
        if (us) {
            for (var i = 0; i < us.length; i++) {
                var u = us[i];
                if (u.userid == facc.user()._id) {
                    return u.price;
                }
            }
        }

    }

});
Template.zhongchouList.events({

});
Template.zhongchouList.onRendered(function() {

});
