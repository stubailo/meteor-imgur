if (Meteor.isClient) {
  Template.body.helpers({
    photoUrl: function () {
      return Session.get("photo");
    },
    deleteHash: function () {
      return Session.get("deleteHash");
    },
    waitingForApiResponse: function () {
      return Session.get("waitingForApiResponse");
    },
    thumbSizes: ["s", "b", "t", "m"],
    thumb: function () {
      return Imgur.toThumbnail(Session.get("photo"), this.valueOf());
    }
  });

  Template.body.events({
    'click button#create': function () {
      Session.set('waitingForApiResponse', true);
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
            Session.set('waitingForApiResponse', false);
            if (error) {
              throw error;
            } else {
              Session.set("photo", data.link);
              Session.set("deleteHash", data.deletehash);
            }
          });
        }
      });
    },
    'click button#delete': function () {
      Session.set('waitingForApiResponse', true);
      Imgur.delete({
        deleteHash: Session.get("deleteHash"),
        apiKey: Config.imgurApiKey
      }, function (error, data) {
        Session.set('waitingForApiResponse', false);
        if (error) {
          throw error;
        } else {
          Session.set("photo", null);
          Session.set("deleteHash", null);
        }
      });

    }
  });
}
