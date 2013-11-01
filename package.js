
Package.describe({
  summary: "soundcloud oauth login service for meteor"
});

Package.on_use(function(api) {
  Package.both = ['client', 'server'];

  api.use('accounts-base', Package.both);
  // Export Accounts (etc) to packages using this one.
  // api.imply('accounts-base', Package.both);
  api.use('accounts-oauth', Package.both);

  api.use('oauth2', Package.both);
  api.use('oauth', Package.both);
  api.use('http', 'server');
  api.use('underscore', 'server');
  api.use('random', 'client');
  api.use('service-configuration', Package.both);

  api.add_files('soundcloud_common.js', Package.both);
  api.add_files('soundcloud_client.js', 'client');
  api.add_files('soundcloud_server.js', 'server');

});
