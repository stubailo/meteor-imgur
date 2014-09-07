if (Meteor.isClient) {
  Template.body.helpers({
    photoUrl: function () {
      return Session.get("photo");
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
            apiKey: Config.imgurApiKey,
            type: "base64"
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
