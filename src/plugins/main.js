'use strict';

const MainPlugin = {
  register: function (server, options, next) {

    server.route({
      method: 'GET',
      path: '/',
      handler: function (request, reply) {
        reply.view('index');
      }
    });

    next();
  }
};

MainPlugin.register.attributes = {
  name: 'main',
  version: '1.0.0'
};

module.exports = MainPlugin;
