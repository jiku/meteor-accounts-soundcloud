//see http://developers.soundcloud.com/docs/api/reference#me
Accounts.soundcloud.whitelistedFields = [
  'id', 'username', 'permalink', 'permalink_url', 'avatar_url', 'country',
  'full_name', 'city', 'description', 'website', 'discogs-name', 'myspace-name',
  'track_count', 'playlist_count', 'followers_count', 'followings_count',
  'public_favorites_count', 'private_tracks_count', 'private_playlists_count'
];

var handleOauthRequest = function(query) {
  var accessToken = getAccessToken(query);
  var identity = getIdentity(accessToken);

  // call user update method here..
  var serviceData = {accessToken: accessToken};
  var serviceFields = _.pick(identity, Accounts.soundcloud.whitelistedFields);
  _.extend(serviceData, serviceFields);
  var rv = {
    serviceData: serviceData,
    options: {profile: {name: identity.full_name}}
  };
  return rv;
};

var getAccessToken = function (query) {
  var config = ServiceConfiguration.configurations.findOne({service: 'soundcloud'});
  if (!config)
    throw new ServiceConfiguration.ConfigError("Service not configured");

  var rv;
  try {
    rv = Meteor.http.post("https://api.soundcloud.com/oauth2/token", {
      headers: {Accept: 'application/json'},
      params: {
        code: query.code,
        grant_type: "authorization_code",
        client_id: config.clientId,
        client_secret: config.secret,
        redirect_uri: Meteor.absoluteUrl("_oauth/soundcloud?close"),
        state: query.state
      }
    });
  } catch (err) {
    throw new Error("Failed to complete OAuth handshake with soundcloud. " + err.message);
  }

  if (rv.data.error) // if the http rv was a json object with an error attribute
    throw new Error("Failed to complete OAuth handshake with soundcloud. " + rv.data.error);

  return rv.data.access_token;
};

var getIdentity = function (accessToken) {
  try {
    var rv = Meteor.http.get("https://api.soundcloud.com/me", {
      params: {
        oauth_token: accessToken,
        format: "json"
      }
    });
    // console.info("fetching identity from: https://api.soundcloud.com/me", rv);
    return rv.data;
  } catch (err) {
    throw new Error("Failed to fetch identity from soundcloud. " + err.message);
  }
};

Accounts.soundcloud.retrieveCredential = function(credentialToken) {
  return Oauth.retrieveCredential(credentialToken);
};


Oauth.registerService('soundcloud', 2, null, handleOauthRequest);
Accounts.registerLoginHandler(function(loginRequest) {
  if(!loginRequest.soundcloud) {
    return undefined;
  }
  return {id: Meteor.userId()};
});

Accounts.oauth.registerService('soundcloud');
