var oauth2orize = require('oauth2orize');
var User = require('../models/user');
var Client = require('../models/client');
var Token = require('../models/token');
var Code = require('../models/code');

function uid(len) {
  var buf = [],
    chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
    charlen = chars.length;

  for (var i = 0; i< len; ++i) {
    buf.push(chars[getRandomInt(0, charlen - 1)]);
  }

  return buf.join('');
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var server = oauth2orize.createServer();

server.serializeClient(function(client, done) {
  return done(null, client._id);
});

server.deserializeClient(function(id, done) {
  Client.findOne({ _id: id }, function(err, client) {
    done(err, client);
  });
});

server.grant(
  oauth2orize.grant.code(
    function grantCode(client, redirectUri, user, ares, done) {
      // Create new authorization code
      var code = new Code({
        value: uid(16),
        clientId: client._id,
        redirectUri: redirectUri,
        userId: user._id
      });

      // Save the auth code and check for errors
      code.save(function(err, savedCode) {
        done(err, savedCode);
      });
    }
  )
);

// Exchange authorization codes for access tokens
server.exchange(
  oauth2orize.exchange.code(
    function exchangeCode(client, code, redirectUri, done) {
      Code.findOne({ value: code }, function(err, authCode) {
        console.log('err:', err);
        condole.log('code:', authCode);
        if (err) return done(err);
        if (authCode === undefined) return done(null, false);
        if (client._id.toString() !== authCode.clientId) return done(null, false);
        if (redirectUri !== authCode.redirectUri) return done(null, false);

        // Delete auth code now that it has been used
        authCode.remove(function(err) {
          if (err) return done(err);

          var token = new Token({
            value: uid(256),
            clientId: authCode.clientId,
            userId: authCode.userId
          });

          // Save access token and check for errrs
          token.save(function(err, savedToken) {
            console.log('token:', savedToken);
            done(err, savedToken);
          });
        });
      });
    }
  )
);

var oauth = {
  authorization: [
    server.authorization(function(clientId, redirectUri, done) {
      Client.findOne({ id: clientId }, function(err, client) {
        if (err) return done(err);

        done(null, client, redirectUri);
      });
    }),
    function afterAuth(req, res) {
      res.render('dialog', {
        transactionID: req.oauth2.transactionID,
        user: req.user,
        client: req.oauth2.client
      });
    }
  ],

  decision: [
    server.decision()
  ],

  token: [
    server.token(),
    server.errorHandler()
  ]
};

module.exports = oauth;