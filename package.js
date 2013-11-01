
Package.describe({
  summary: "soundcloud oauth login service for meteor"
});

Package.on_use(function(api) {
  api.use('oauth2', ['client', 'server']);
  api.use('oauth', ['client', 'server']);
  api.use('http', 'server');
  api.use('random', 'client');
  api.use('service-configuration', ['client', 'server']);

  api.export('Soundcloud');

  api.add_files([
    'soundcloud_configure.html',
    'soundcloud_configure.js',
    'soundcloud_client.js'
  ], 'client');
  api.add_files('soundcloud_common.js', ['client', 'server']);
  api.add_files('soundcloud_server.js', 'server');

});
