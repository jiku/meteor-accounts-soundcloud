
Package.describe({
  summary: "soundcloud oauth login service for meteor",
  name: "jiku:accounts-soundcloud",
  version: "1.0.1",
  git: "https://github.com/jiku/meteor-accounts-soundcloud.git",
  author: "gregory nicholas <gregory@unvael.com>; dustin chaffin <dustinchaffin@gmail.com>",
});

Package.on_use(function(api) {
  var both = [ 'client', 'server' ];

  api.use( 'accounts-base@1.1.0', both );
  // Export Accounts (etc) to packages using this one.
  api.imply( 'accounts-base', both );
  api.use( 'accounts-oauth@1.1.0', both );
  api.use( 'jiku:soundcloud@1.0.1', both )

  api.add_files( 'soundcloud-login-button.css', both );
  api.add_files( 'soundcloud.js', both );
});
