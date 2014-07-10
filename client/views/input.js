Template.input.events = {
  'keydown textarea#message' : function (e, tmp) {
    if (e.which == 13 && !e.shiftKey ) { // 13 is the enter key event
  	  e.preventDefault();

      // Check for login
      var user = Meteor.user();
      if (!user)
        throw new Meteor.Error(500, "Must be logged in to post a message");

      // Grab textarea DOM node from template
      var textarea = $(tmp.find('textarea'));

      if (message.value != '') {
        Messages.insert({
          name: user.profile.name,
          userId: user._id,
          message: textarea.val(),
          time: Date.now()
        });
 
      }

      // Clear textarea
      textarea.val('');
    }
  }
};