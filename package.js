Package.describe({
  summary: "Moved to simple:imgur.",
  version: "1.0.2",
  git: "https://github.com/stubailo/meteor-imgur",
  name: "sashko:imgur"
});

Package.onUse(function(api) {
  api.use(["check", "http", "underscore"]);
  api.versionsFrom('METEOR@0.9.1.1');
  api.addFiles('imgur.js');
  api.export("Imgur");
});

// No tests because it's just an API wrapper
