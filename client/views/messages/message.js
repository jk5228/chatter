Template.message.helpers({
  ownsComment: function() {
    var user = Meteor.user();
    if (user && user._id === this.userId)
      return true;
    return false;
  }
});

Template.message.events({
  'click .close': function(e, tmp) {
    if (Meteor.userId() !== tmp.data.userId)
      throw new Meteor.Error(500, "You may only delete your own messages");

    Messages.remove(tmp.data._id);
  }
});