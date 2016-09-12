var homeRoutes = FlowRouter.group({
    prefix: "/home"
});
homeRoutes.route('/', {
	action: function(params, queryParams) {
		FlowLayout.render("home");
	},
  triggersEnter: function(context, redirect) {
        if (facc.isGuest()) {
            FlowRouter.go("/login");
        }
    }
});
homeRoutes.route('/actives', {
    action: function(params, queryParams) {
        FlowLayout.render("actives");
    },
  triggersEnter: function(context, redirect) {
        if (facc.isGuest()) {
            FlowRouter.go("/login");
        }
    }
});
homeRoutes.route('/info', {
    action: function(params, queryParams) {
        FlowLayout.render("homeInfo");
    },
  triggersEnter: function(context, redirect) {
        if (facc.isGuest()) {
            FlowRouter.go("/login");
        }
    }
});

homeRoutes.route('/nickname', {
	action: function(params, queryParams) {
		FlowLayout.render("homeNickname");
	},
  triggersEnter: function(context, redirect) {
        if (facc.isGuest()) {
            FlowRouter.go("/login");
        }
    }
});
homeRoutes.route('/certification', {
    action: function(params, queryParams) {
        FlowLayout.render("homeCertification");
    },
  triggersEnter: function(context, redirect) {
        if (facc.isGuest()) {
            FlowRouter.go("/login");
        }
    }
});
homeRoutes.route('/set', {
    action: function(params, queryParams) {
        FlowLayout.render("homeSet");
    },
  triggersEnter: function(context, redirect) {
        if (facc.isGuest()) {
            FlowRouter.go("/login");
        }
    }
});

homeRoutes.route('/password', {
    action: function(params, queryParams) {
        FlowLayout.render("homePassword");
    },
  triggersEnter: function(context, redirect) {
        if (facc.isGuest()) {
            FlowRouter.go("/login");
        }
    }
});
homeRoutes.route('/messages', {
    action: function(params, queryParams) {
        FlowLayout.render("homeMessages");
    },
  triggersEnter: function(context, redirect) {
        if (facc.isGuest()) {
            FlowRouter.go("/login");
        }
    }
});
homeRoutes.route('/suggest', {
    action: function(params, queryParams) {
        FlowLayout.render("homeSuggest");
    },
  triggersEnter: function(context, redirect) {
        if (facc.isGuest()) {
            FlowRouter.go("/login");
        }
    }
});

homeRoutes.route('/point', {
    action: function(params, queryParams) {
        FlowLayout.render("homePoint");
    },

});
homeRoutes.route('/track', {
    action: function(params, queryParams) {
        FlowLayout.render("homeTrack");
    },

});
