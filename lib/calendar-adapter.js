/**
 * Weather adapter.
 */
'use strict';

const {Adapter} = require('gateway-addon');
const manifest = require('../manifest.json');
const CalendarDevice = require('./calendar-device');

const DEFAULT_OWM_API_KEY = '43693fd2bb0ac1e5015c8ea70f018054';

/**
 * Adapter for weather devices.
 */
class CalendarAdapter extends Adapter {
  /**
   * Initialize the object.
   *
   * @param {Object} addonManager - AddonManagerProxy object
   * @param {Object} config - Configured options
   */
  constructor(addonManager, config) {
    super(addonManager, manifest.id, manifest.id);
    addonManager.addAdapter(this);
    
    //this.knownLocations = new Set();
    this.config = config;
    this.config.provider === 'OpenWeatherMap'
    this.startPairing();
  }

  /**
   * Attempt to add any configured locations.
   */
  startPairing() {      
      if (this.config.provider === 'OpenWeatherMap') {
        this.config.apiKey = DEFAULT_OWM_API_KEY;
        this.config.pollInterval = Math.max(this.config.pollInterval, 60);
      }

      const dev = new CalendarDevice(
        this,
        this.config.units,
        this.config.provider,
        this.config.apiKey,
        this.config.pollInterval
      );
      dev.promise.then(() => this.handleDeviceAdded(dev));      
  }

  /**
   * Remove a device from this adapter.
   *
   * @param {Object} device - The device to remove
   * @returns {Promise} Promise which resolves to the removed device.
   */
  removeThing(device) {
    //this.knownLocations.delete(device.location);
    if (this.devices.hasOwnProperty(device.id)) {
      this.handleDeviceRemoved(device);
    }

    return Promise.resolve(device);
  }
}

module.exports = CalendarAdapter;
