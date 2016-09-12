Template.myNews.onCreated(function() {
    this.subscribe("mynews",facc.user()._id, {
        onReady: function() {
            loading.hide();
        }
    });
});
Template.myNews.helpers({
    news: function() {
        return NewsFovar.find({userid:facc.user()._id},{sort:{createAt:-1}});
    }
});
Template.myNews.events({
    
});

Template.myNews.onRendered(function() {
    $(window).scrollTop(0);
});
