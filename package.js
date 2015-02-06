Package.describe({
  summary: "A package to image data to Imgur with one function call.",
  version: "1.0.2",
  git: "https://github.com/stubailo/meteor-imgur",
  name: "simple:imgur"
});

Package.onUse(function(api) {
  api.use(["check", "http", "underscore"]);
  api.versionsFrom('METEOR@0.9.1.1');
  api.addFiles('imgur.js');
  api.export("Imgur");
});

// No tests because it's just an API wrapper
