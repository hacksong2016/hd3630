Template.paimaiItem.onCreated(function() {
    this.subscribe("paimaiDetail", { userid: facc.user()._id, pid: FlowRouter.getQueryParam("id") }, { onReady: function() { loading.hide(); } });
});
Template.paimaiItem.helpers({
    paimai: function() {
        return Paimai.findOne({ _id: FlowRouter.getQueryParam("id") });
    },
    checkPrice: function() {
        var pp = Paimai.findOne({ _id: FlowRouter.getQueryParam("id") });
        if (pp && pp.users) {
            var us = pp.users;
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
        var pp = Paimai.findOne({ _id: FlowRouter.getQueryParam("id") });
        if (pp && pp.users) {
            var us = pp.users;
            for (var i = 0; i < us.length; i++) {
                var u = us[i];
                if (u.userid == facc.user()._id) {
                    return u.price;
                }
            }
        }
    }
});
Template.paimaiItem.events({
    "click .se-next": function() {

        var pp = Paimai.findOne({ _id: FlowRouter.getQueryParam("id") });
        if (!$("#price").val()) {
            alert("请填写值");
            return;
        }

        if ($("#price").val() < pp.startPrice) {
            alert("出价需高于底价");
            return;
        }
        loading.show();

        Paimai.update({ _id: FlowRouter.getQueryParam("id") }, {
            $addToSet: {
                users: {
                    userid: facc.user()._id,
                    price: $("#price").val() * 1,
                    createAt: new Date(),
                    nickname: facc.user().nickname,
                    avatar: facc.user().avatar,
                }
            }
        });
        alert("已出价请等待拍卖时间结束");
        FlowRouter.go("/paimai/list");
    }
});
Template.paimaiItem.onRendered(function() {

});
