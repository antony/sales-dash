'use strict';

let Joi = require('joi'),
    Boom = require('boom');

const MainPlugin = {
  register: function (server, options, next) {

    server.route({
      method: 'GET',
      path: '/{params*}',
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

        server.methods.sheet.add(request.payload, (err) => {

          if (err) { reply(Boom.wrap(err, 400)); }

          reply({});
        });
      }
    });

    server.route({
      method: 'GET',
      path: '/api/companies',
      handler: function(request, reply) {

        server.methods.sheet.fetch((err, entries) => {

          if (err) { return reply(err); }

          let companies = entries.map((entry) => {
            return entry.company;
          })

          reply(companies);

        })

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
