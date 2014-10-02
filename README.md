Meteor Imgur Upload Package
============

`meteor add simple:imgur`

A meteor package that lets you upload images to Imgur. Is very nice to use with [`mdg:camera`](https://github.com/meteor/mobile-packages/tree/master/packages/mdg:camera), as in the example app included in this repo.

API Documentation
-----------

Both API methods work on client and server.

### Imgur.upload(options, callback)

#### Arguments

1. `options` (required) an object with options, described below.
2. `callback(error, data)` (required) a callback that is called with two arguments, 'error', and 'data'.
    1. `error` a Meteor.Error describing the reason the photo could not be uploaded.
    2. `data` an object that contains the response from the Imgur API, [documented here](https://api.imgur.com/models/image). The most useful property is `data.link`, which contains the URL of the newly uploaded image.
    
#### Options

- `apiKey` the Imgur Client ID. Get it by signing up for the API at <https://api.imgur.com/oauth2/addclient>.
- `image` the image data, can a base64-encoded image data string or the URL of an image somewhere on the internet.
- `type`, `name`, `title`, `description`, `album` optional properties exactly as documented at <https://api.imgur.com/endpoints/image#image-upload>.

---

### Imgur.toThumbnail(imageUrl, size)

#### Arguments

1. `imageUrl` the URL for an image on Imgur, for example "http://i.imgur.com/wbJ84Wm.jpg".
2. `size` the key of the desired thumbnail size, chosen from the list at the bottom of <https://api.imgur.com/models/image>. You can also use a constant from the list below.
    * `Imgur.SMALL_SQUARE`
    * `Imgur.BIG_SQUARE`
    * `Imgur.SMALL_THUMBNAIL`
    * `Imgur.MEDIUM_THUMBNAIL`
    * `Imgur.LARGE_THUMBNAIL`
    * `Imgur.HUGE_THUMBNAIL`