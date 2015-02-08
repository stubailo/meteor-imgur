if (Meteor.isClient) {
  Template.body.helpers({
    photoUrl: function () {
      return Session.get("photo");
    },
    deleteHash: function () {
      return Session.get("deleteHash");
    },
    thumbSizes: ["s", "b", "t", "m"],
    thumb: function () {
      return Imgur.toThumbnail(Session.get("photo"), this.valueOf());
    }
  });

  Template.body.events({
    'click button#create': function () {
      $('button').prop('disabled', true);
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
            $('button').prop('disabled', false);
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
      $('button').prop('disabled', true);
      Imgur.delete({
        deleteHash: Session.get("deleteHash"),
        apiKey: Config.imgurApiKey
      }, function (error, data) {
        $('button').prop('disabled', false);
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
