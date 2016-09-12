Meteor.publish("mymessages", function(uid) {
    return Messages.find({ status: 1,$or:[
    		{from:uid},
    		{to:uid}
    	] })
});