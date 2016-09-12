FlowRouter.route('/', {
    name: "site",
    action: function(params, queryParams) {
        FlowLayout.render("site");
    }
});
FlowRouter.route('/depot', {
    name: "depot",
    action: function(params, queryParams) {
        FlowLayout.render("depot");
    },
    triggersEnter: function(context, redirect) {
        if (facc.isGuest()) {
            FlowRouter.go("/login");
        }
    }
});
FlowRouter.route('/yuyue', {
    name: "yuyue",
    action: function(params, queryParams) {
        FlowLayout.render("yuyue");
    },
    triggersEnter: function(context, redirect) {
        if (facc.isGuest()) {
            FlowRouter.go("/login");
        }
    }
});
FlowRouter.route('/item', {
    name: "item",
    action: function(params, queryParams) {
        FlowLayout.render("item");
    },
    triggersEnter: function(context, redirect) {
        if (facc.isGuest()) {
            FlowRouter.go("/login");
        }
    }
});
FlowRouter.route('/address', {
    action: function(params, queryParams) {
        FlowLayout.render("address");
    },
    triggersEnter: function(context, redirect) {
        if (facc.isGuest()) {
            FlowRouter.go("/login");
        }
    }
});

FlowRouter.route('/select', {
    action: function(params, queryParams) {
        FlowLayout.render("select");
    },
    triggersEnter: function(context, redirect) {
        if (facc.isGuest()) {
            FlowRouter.go("/login");
        }
    }
});

FlowRouter.route('/goods', {
    action: function(params, queryParams) {
        FlowLayout.render("goods");
    },
    triggersEnter: function(context, redirect) {
        if (facc.isGuest()) {
            FlowRouter.go("/login");
        }
    }
});

FlowRouter.route('/others', {
    action: function(params, queryParams) {
        FlowLayout.render("others");
    },
    triggersEnter: function(context, redirect) {
        if (facc.isGuest()) {
            FlowRouter.go("/login");
        }
    }
});

FlowRouter.route('/bill', {
    action: function(params, queryParams) {
        FlowLayout.render("bill");
    },
    triggersEnter: function(context, redirect) {
        if (facc.isGuest()) {
            FlowRouter.go("/login");
        }
    }
});

FlowRouter.route('/qrcode', {
    action: function(params, queryParams) {
        FlowLayout.render("qrcode");
    },
    triggersEnter: function(context, redirect) {
        if (facc.isGuest()) {
            FlowRouter.go("/login");
        }
    }
});

FlowRouter.route('/shouquan', {
    action: function(params, queryParams) {
        FlowLayout.render("shouquan");
    },
    triggersEnter: function(context, redirect) {
        if (facc.isGuest()) {
            FlowRouter.go("/login");
        }
    }
});
FlowRouter.route('/paimai', {
    action: function(params, queryParams) {
        FlowLayout.render("paimai");
    },
    triggersEnter: function(context, redirect) {
        if (facc.isGuest()) {
            FlowRouter.go("/login");
        }
    }
});
FlowRouter.route('/zhongchou', {
    action: function(params, queryParams) {
        FlowLayout.render("zhongchou");
    },
    triggersEnter: function(context, redirect) {
        if (facc.isGuest()) {
            FlowRouter.go("/login");
        }
    }
});

FlowRouter.route('/paimai/list', {
    action: function(params, queryParams) {
        FlowLayout.render("paimaiList");
    },
    triggersEnter: function(context, redirect) {
        if (facc.isGuest()) {
            FlowRouter.go("/login");
        }
    }
});
FlowRouter.route('/paimai/item', {
    action: function(params, queryParams) {
        FlowLayout.render("paimaiItem");
    },
    triggersEnter: function(context, redirect) {
        if (facc.isGuest()) {
            FlowRouter.go("/login");
        }
    }
});
FlowRouter.route('/zhongchou/list', {
    action: function(params, queryParams) {
        FlowLayout.render("zhongchouList");
    },
    triggersEnter: function(context, redirect) {
        if (facc.isGuest()) {
            FlowRouter.go("/login");
        }
    }
});
FlowRouter.route('/zhongchou/item', {
    action: function(params, queryParams) {
        FlowLayout.render("zhongchouItem");
    },
    triggersEnter: function(context, redirect) {
        if (facc.isGuest()) {
            FlowRouter.go("/login");
        }
    }
});
