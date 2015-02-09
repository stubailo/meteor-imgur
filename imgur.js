var ValidImgurType = Match.Where(function (val) {
  return val === "base64" || val === "URL";
});

/* Depending on whether Mashape key is there, set the right API settings */
var getAPISettings = function (options) {
    var endpoint = "https://api.imgur.com";
    var headers = {
      Authorization: "Client-ID " + options.apiKey,
    };

    if (options.mashapeKey) {
      endpoint = "https://imgur-apiv3.p.mashape.com";
      headers['X-Mashape-Key'] = options.mashapeKey;
    }
    return {endpoint: endpoint, headers: headers};
};

Imgur = {
  /**
   * @summary Upload an image to imgur
   * @param  {Object}   options Required options Object
   * @param {String} options.apiKey The Imgur API key for this app
   * @param {String} options.image The data URI or image URL to upload
   * @param {String} options.mashapeKey The Mashape Key for this app
   * @param {String} options.type,name,title,description,album
   * As described in the
   * [Imgur Documentation](https://api.imgur.com/endpoints/image#image-upload).
   * @param  {Function} callback Required callback that gets an error or results
   * in the format described in the
   * [Imgur docs](https://api.imgur.com/models/image).
   */
  upload: function (options, callback) {
    check(options, {
      apiKey: String,
      image: String,
      mashapeKey: Match.Optional(String),
      type: Match.Optional(ValidImgurType),
      name: Match.Optional(String),
      title: Match.Optional(String),
      description: Match.Optional(String),
      album: Match.Optional(String)
    });
    check(callback, Function);

    // still work if the prefix is included
    if (options.image.indexOf(",") !== -1) {
      options.image = options.image.split(",")[1];
    }

    var data = {};
    
    var passThrough = ["image", "type", "name", "title",
      "description", "album"];
    _.extend(data, _.pick(options, passThrough));

    var api = getAPISettings(options);
  
    HTTP.post(api.endpoint + "/3/image", {
      data: data,
      headers: api.headers
    }, function (error, result) {
      if (error) {
        callback(error);
        return;
      }

      if (result && result.data && result.data.data) {
        callback(null, result.data.data);
      } else {
        callback(new Meteor.Error(result.data.status,
          "Imgur request unsuccessful."));
      }
    });
  },

  /**
   * @summary Delete an image from imgur
   * @param  {Object} options Required options Object
   * @param {String} options.apiKey The Imgur API key for this app
   * @param {String} options.deleteHash The delete hash for this image, retrieved at creation
   * @param {String} options.mashapeKey The Mashape Key for this app
   * @param  {Function} callback Required callback that gets an error or results
   * in the format described in the
   * [Imgur docs](https://api.imgur.com/models/basic).
   */
  delete: function (options, callback) {
    check(options, {
      apiKey: String,
      deleteHash: String,
      mashapeKey: Match.Optional(String),
    });
    check(callback, Function);
    
    var api = getAPISettings(options);

    HTTP.del(api.endpoint + "/3/image/" + options.deleteHash, {
      headers: api.headers
    }, function (error, result) {
      if (error) {
        callback(error);
        return;
      }

      if (result && result.data && result.data.data) {
        callback(null, result.data.data);
      } else {
        callback(new Meteor.Error(result.data.status,
          "Imgur request unsuccessful."));
      }
    });
  },


  /**
   * @summary Transform an Imgur link into a thumbnail link of a certain size.
   * @param  {String} imgurLink An Imgur image link as returned by Imgur.upload
   * @param  {String} size   One of the size constants, or "Thumbnail Suffix"
   * options in the [Imgur docs](https://api.imgur.com/models/image).
   * @return {String} The URL of the thumbnail image.
   */
  toThumbnail: function (imgurLink, size) {
    check(imgurLink, String);
    check(size, String);
    var split = imgurLink.split(".");
    return _.initial(split).join(".") + size + "." + _.last(split);
  }
};

// Add the thumbnail size constants
_.extend(Imgur, {
  SMALL_SQUARE: "s",
  BIG_SQUARE: "b",
  SMALL_THUMBNAIL: "t",
  MEDIUM_THUMBNAIL: "m",
  LARGE_THUMBNAIL: "l",
  HUGE_THUMBNAIL: "h"
});