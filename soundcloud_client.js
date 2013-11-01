// Request soundcloud credentials for the user
// @param options {optional}
// @param credentialRequestCompleteCallback {Function} Callback function to call on
//   completion. Takes one argument, credentialToken on success, or Error on
//   error.
Accounts.soundcloud.requestCredential = function (options, credentialRequestCompleteCallback) {
  // support both (options, callback) and (callback).
  if (!credentialRequestCompleteCallback && typeof options === 'function') {
    credentialRequestCompleteCallback = options;
  }

  var config = ServiceConfiguration.configurations.findOne({service: 'soundcloud'});
  if (!config) {
    credentialRequestCompleteCallback && credentialRequestCompleteCallback(new ServiceConfiguration.ConfigError("Service not configured"));
    return;
  }

  var credentialToken = Random.id();
  var redirect_uri = encodeURIComponent(config.redirect_uri);
  var loginUrl =
      'https://soundcloud.com/connect' +
      '?client_id=' + config.clientId +
      '&redirect_uri=' + redirect_uri +
      '&scope=non-expiring' +
      '&response_type=code_and_token' +
      '&display=popup' +
      '&state=' + credentialToken;

  Oauth.initiateLogin(
    credentialToken, loginUrl, credentialRequestCompleteCallback);
};
