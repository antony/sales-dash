'use strict';

const GoogleSpreadsheet = require('google-spreadsheet'),
      spreadsheet = new GoogleSpreadsheet('1xqsS5pItqnHuYq6uqd2yKeARxHd8VyLpwfroY5EHF38'),
      credentials = require('../drive-api.credentials.json');

const GoogleSheetsPlugin = {

  register: function (server, options, next) {

    let worksheet;

    spreadsheet.useServiceAccountAuth(credentials, (err) => {
      spreadsheet.getInfo(( err, sheet ) => {

        worksheet = sheet.worksheets[0];

        next(err);
      });
    });

    const addEntry = function (data, next) {
      worksheet.addRow(data, next);
    };

    const fetchEntries = function(next) {
      worksheet.getRows({}, next);
    }

    const cacheOptions = {
      expiresIn: 30000,
      generateTimeout: 100
    };

    server.method([
      {name: 'sheet.add', method: addEntry, options: {}},
      {name: 'sheet.fetch', method: fetchEntries, options: {
        generateKey: () => { return 'sheet.fetch' },
        cache: cacheOptions
        }
      }
    ]);

  }
};

GoogleSheetsPlugin.register.attributes = {
  name: 'google-sheets',
  version: '1.0.0'
};

module.exports = GoogleSheetsPlugin;
