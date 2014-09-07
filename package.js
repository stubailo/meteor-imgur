Package.describe({
  summary: "A package to upload image data to Imgur.",
  version: "1.0.0",
  git: ""
});

Package.onUse(function(api) {
  api.versionsFrom('METEOR@0.9.1.1');
  api.addFiles('sashko:imgur.js');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('sashko:imgur');
  api.addFiles('sashko:imgur-tests.js');
});
