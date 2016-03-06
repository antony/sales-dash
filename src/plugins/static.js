'use strict';

const StaticPlugin = {
  register: function (server, options, next) {

    server.route({
      method: 'GET',
      path: '/static/{param*}',
      handler: {
        directory: {
          path: '.',
          redirectToSlash: true,
          index: true
        }
      }
    });

    next();
  }
};

StaticPlugin.register.attributes = {
  name: 'statics',
  version: '1.0.0'
};

module.exports = StaticPlugin;
