Template.footer.helpers({
    fouces: function(param) {
        return (this.active == param);
    },
    isDentist: function() {
        return facc.get("DENTIST") == 1;
    },
});
Template.footer.onRendered(function() {
    if (!facc.isGuest()) {
        Meteor.call("zixuncount", { userid: facc.user()._id }, function(e, r) {
            if (r > 0) {
                $(".footer-zxc").show();
            }
        });
    }

});
