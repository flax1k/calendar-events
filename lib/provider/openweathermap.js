const Provider = require('./provider');
const fetch = require('node-fetch');
const weekday = ["Duminica","Luni","Marti","Miercuri","Joi","Vineri","Sambata"];

const BASE_URL = 'https://script.google.com/macros/s/AKfycbwkyJYXt9GmWPvXm0CwIZpbrr4qjG7w5BIwFNidl5QxjcPDoDNYzGrFZS339sk-8M79/exec';

class OpenWeatherMapProvider extends Provider {
  constructor(units, apiKey) {
    super(units, apiKey);
    this.data = null;
  }

  poll() {
    const url = `${BASE_URL}`;
    this.next = null;
    this.events = null;
    this.moon = null;;
    return fetch(url).then((res) => {
      return res.json();
    }).then((body) => {
      this.data = body;
      console.log(this.data);
    });
  }

  externalUrl() {
    return `https://openweathermap.org/weathermap?zoom=12`;
  }

  today() {
    if (!this.data) {
      return null;
    }
    const d = new Date();
    return weekday[d.getDay()];
  }

  datazi() {
    if(!this.data) {
      return null;
    }
    const date = new Date();
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);
    const currentDate = `${day}-${month}-${year}`;
    return currentDate;
  }

  eventtoday() {
    if (Array.isArray(this.data.values) && !this.data.values.length) {
      return "Fara evenimente";
    } else {
      for (let i = 0; i < this.data.values.length; i++) {
        return this.data.values[i].title;
      }
    }
  }

  monthevents() {
    if (Array.isArray(this.data.next) && !this.data.next.length) {
      return "Fara evenimente";
    } else {
      for (let i = 0; i < this.data.next.length; i++) {
        return this.data.next[i].title;
      }
    }
  }

  moonevent() {
    if (Array.isArray(this.data.moon) && !this.data.moon.length) {
      return " ";
    } else {
      this.data.moon[i].title
    }
  }
}

module.exports = OpenWeatherMapProvider;
