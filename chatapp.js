Meteor.methods({
  clearMessages: function() {
    if (!this.isSimulation) {
      Messages.remove({});
      Messages.insert({
        name: "",
        message: Meteor.user().profile.name + " cleared the messages",
        time: Date.now()
      });
    }
  }
});