'use strict';

const Hapi = require('hapi'),
      Hoek = require('hoek'),
      Path = require('path');

const server = new Hapi.Server({
  connections: {
    routes: {
      files: {
        relativeTo: Path.join(__dirname, 'public')
      }
    }
  }
});
server.connection({ port: 3000 });

server.register([

  require('inert'),
  require('vision'),
  require('./src/plugins/main'),
  require('./src/plugins/static')

], (err) => {

  server.views({
    engines: {
      html: require('handlebars')
    },
    relativeTo: __dirname,
    path: 'src/views'
  });

  server.start((err) => {
    Hoek.assert(!err, err);
    console.log('Server running at:', server.info.uri);
  });

});
