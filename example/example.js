if (Meteor.isClient) {
  Template.body.helpers({
    photoUrl: function () {
      return Session.get("photo");
    },
    thumbSizes: ["s", "b", "t", "m"],
    thumb: function () {
      return Imgur.toThumbnail(Session.get("photo"), this.valueOf());
    }
  });

  Template.body.events({
    'click button': function () {
      MeteorCamera.getPicture({
        width: 400,
        height: 300,
        quality: 30
      }, function (error, data) {
        if (error) {
          throw error;
        } else {
          Imgur.upload({
            image: data,
            apiKey: Config.imgurApiKey
          }, function (error, data) {
            if (error) {
              throw error;
            } else {
              Session.set("photo", data.link);
            }
          });
        }
      });
    }
  });
}
