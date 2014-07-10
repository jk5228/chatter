Template.messages.helpers({
  messages: function () {
    return Messages.find({}, { sort: { time: -1 }});
  },
});

Template.messages.rendered = function() {
  this.movebar = {
    active: false,
    offset: 0
  };
};

Template.messages.events({
  'mousedown #clear': function(e, tmp) {
    tmp.movebar.active = true;
    tmp.movebar.offset = e.pageX;
    var el = $(tmp.find('#clear'));
    el.css({'cursor': 'grabbing','cursor': '-webkit-grabbing'});
  },

  'mouseup #clear': function(e, tmp) {
    var el = $(tmp.find('#clear'));

    tmp.movebar.active = false;
    el.animate({'margin-left': '0px'}, 200);
    el.css({'cursor': 'grab','cursor': '-webkit-grab'});
  },

  'mouseleave #slide': function(e, tmp) {
    var el = $(tmp.find('#clear'));

    tmp.movebar.active = false;
    el.animate({'margin-left': '0px'}, 200);
  },

  'mousemove #slide': function(e, tmp) {
    if (tmp.movebar.active) {
      var el = $(tmp.find('#clear'));
      var width = $(tmp.find('#slide')).width();

      var distance = Math.min(e.pageX - tmp.movebar.offset);
      var maxDist  = width - el.outerWidth();
      var xMargin  = Math.min(maxDist, distance);
      xMargin      = Math.max(0, xMargin);

      el.css({'margin-left': xMargin+'px'});
      if (distance > maxDist && Messages.find({}).count() > 1)
        Meteor.call('clearMessages');
    }
  }
});