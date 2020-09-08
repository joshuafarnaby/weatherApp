export class Weather {
  constructor(city) {
    this.API_KEY = '40ba3ecad375b8f1b67c80367fb64827';
    this.city = city;
  }

  // improve this method - error handling
  getCityFromList(city) {
    return new Promise((resolve, reject) => {
      fetch('./city.list.json')
        .then((res) => res.json())
        .then((data) => {
          data.forEach((obj) => {
            let targetCity = city.toLowerCase();
            let currentCity = obj.name.toLowerCase();

            if (currentCity === targetCity && obj.country === 'GB') {
              resolve(obj);
              return;
            }
          });
        })
        .catch((error) => reject(error));
    });
  }

  getCityID(object) {
    return object.id;
  }

  fetchWeatherData(id) {
    return new Promise((resolve, reject) => {
      fetch(
        `http://api.openweathermap.org/data/2.5/weather?id=${id}&APPID=${this.API_KEY}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.message === 'Internal error') {
            reject(data);
          } else {
            resolve(data);
          }
        });
    });
  }

  // how to deal with undefined data?
  formatResponseData(object) {
    return {
      longitude: object.coord.lon,
      latitude: object.coord.lat,
      city: object.name,
      summary: object.weather[0].description,
      iconCode: object.weather[0].icon,
      currentTemp: object.main.temp,
      feelsLike: object.main.feels_like,
      humidity: object.main.humidity,
      minTemp: object.main.temp_min,
      maxTemp: object.main.temp_max,
      sunrise: object.sys.sunrise,
      sunset: object.sys.sunset,
      pressure: object.main.pressure,
      visibility: object.visibility / 1000,
      windSpeed: object.wind.speed,
      windDirection: object.wind.deg,
    };
  }
}
