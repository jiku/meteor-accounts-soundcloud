
Package.describe({
  summary: "soundcloud oauth login service for meteor",
  name: "quietcreep:accounts-soundcloud",
  version: "1.0.0",
  git: "https://github.com/quietcreep/meteor-soundcloud.git",
  author: "gregory nicholas <gregory@unvael.com>; dustin chaffin",
});

Package.on_use(function(api) {
  var both = [ 'client', 'server' ];

  api.use( 'accounts-base@1.1.0', both );
  // Export Accounts (etc) to packages using this one.
  api.imply( 'accounts-base', both );
  api.use( 'accounts-oauth@1.1.0', both );
  api.use( 'quietcreep:soundcloud@1.0.0', both )

  api.add_files( 'soundcloud-login-button.css', both );
  api.add_files( 'soundcloud.js', both );
});
