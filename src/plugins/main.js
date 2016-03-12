'use strict';

let Joi = require('joi');

const MainPlugin = {
  register: function (server, options, next) {

    server.route({
      method: 'GET',
      path: '/',
      handler: function (request, reply) {
        reply.view('index');
      }
    });

    server.route({
      method: 'POST',
      path: '/api/sale',
      config: {
        validate: {
          payload: {
            bookingDate: Joi.date().required(),
            company: Joi.string().required(),
            jobCost: Joi.number().required(),
            jobDescription: Joi.string().required(),
            saleAmount: Joi.number().required(),
            saleDate: Joi.date().required(),
            user: Joi.string().required()
          }
        }
      },
      handler: function(request, reply) {
        console.log('Got this', request.payload);
        reply({});
      }
    })

    next();
  }
};

MainPlugin.register.attributes = {
  name: 'main',
  version: '1.0.0'
};

module.exports = MainPlugin;
