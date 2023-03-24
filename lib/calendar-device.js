/**
 * Calendar device type.
 */
'use strict';

const crypto = require('crypto');
const {Device} = require('gateway-addon');
const OpenWeatherMapProvider = require('./provider/openweathermap');
const CalendarProperty = require('./calendar-property');


/**
 * Weather device type.
 */
class CalendarDevice extends Device {
  /**
   * Initialize the object.
   *
   * @param {Object} adapter - WeatherAdapter instance
   * @param {string} location - Configured location
   * @param {string} units - Configured unites
   * @param {string} provider - Configured provider
   * @param {string} apiKey - Configured API key
   * @param {number} pollInterval - Interval at which to poll provider
   */
  constructor(adapter, units, provider, apiKey, pollInterval) {
    const shasum = crypto.createHash('sha1');
    //shasum.update(location.name);
    super(adapter, `calendar-${shasum.digest('hex')}`);

    this.units = units;
    this.apiKey = apiKey;
    this.pollInterval = pollInterval * 60 * 1000;

    this.name = this.description = `Calendar events`;
    this['@context'] = 'https://iot.mozilla.org/schemas';
    this['@type'] = ['TemperatureSensor', 'MultiLevelSensor'];

    this.provider = new OpenWeatherMapProvider(units, apiKey);

    this.properties.set(
      'today',
      new CalendarProperty(
        this,
        'today',
        {
          label: 'Astazi',
          type: 'string',
          readOnly: true,
        },
        null
      )
    );

    this.properties.set(
      'datazi',
      new CalendarProperty(
        this,
        'datazi',
        {
          label: 'Data',
          type: 'string',
          readOnly: true,
        },
        null
      )
    );

    this.properties.set(
      'eventtoday',
      new CalendarProperty(
        this,
        'eventtoday',
        {
          label: 'Evenimente astazi',
          '@type': 'string',
          type: 'string',
          readOnly: true,
        },
        null
      )
    );

    this.properties.set(
      'monthevents',
      new CalendarProperty(
        this,
        'monthevents',
        {
          label: 'Evenimentele lunii',
          '@type': 'string',
          type: 'string',
          readOnly: true,
        },
        null
      )
    );

    this.properties.set(
      'moonevent',
      new CalendarProperty(
        this,
        'moonevent',
        {
          label: 'Fazele lunii',
          type: 'string',
          readOnly: true,
        },
        null
      )
    );


    this.promise = this.poll().then(() => {
      this.links = [
        {
          rel: 'alternate',
          mediaType: 'text/html',
          href: this.provider.externalUrl(),
        },
      ];
    });
  }

  /**
   * Update the weather data.
   */
  poll() {
    const promise = this.provider.poll().then(() => {
      const properties = [
        'today',
        'datazi',
        'eventtoday',
        'monthevents',
        'moonevent'
      ];
      for (const property of properties) {
        const value = this.provider[property]();
        const prop = this.properties.get(property);

        if (prop.value !== value) {
          prop.setCachedValue(value);
          this.notifyPropertyChanged(prop);
        }
      }
    }).catch((e) => {
      console.error('Failed to poll calendar provider:', e);
    });

    setTimeout(this.poll.bind(this), this.pollInterval);
    return promise;
  }
}

module.exports = CalendarDevice;
