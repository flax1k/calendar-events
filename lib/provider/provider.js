class Provider {
  constructor(units, apiKey) {
    this.units = units;
    this.apiKey = apiKey;
  }

  poll() {
    return Promise.resolve();
  }

  externalUrl() {
    return null;
  }

  today() {
    return null;
  }

  datazi() {
    return null;
  }

  eventtoday() {
    return null;
  }

  monthevets(){
    return null;
  }

  moonevent() {
    return null;
  }

}

module.exports = Provider;
