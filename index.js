'use strict';

const {Database} = require('gateway-addon');
const manifest = require('./manifest.json');
const CalendarAdapter = require('./lib/calendar-adapter');

module.exports = (addonManager, _, errorCallback) => {
  const db = new Database(manifest.id);
  db.open().then(() => {
    return db.loadConfig();
  }).then((config) => {
    config.provider = 'OpenWeatherMap';
    db.saveConfig(config);

    if (config.provider === 'OpenWeatherMap') {
      if (!config.apiKey) {
        errorCallback(manifest.id, 'API key must be set!');
        return;
      }
    } 

    new CalendarAdapter(addonManager, config);
  }).catch((e) => {
    errorCallback(manifest.id, e);
  });
};
