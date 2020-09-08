export class UI {
  constructor() {
    this.latitude = document.getElementById('latitude');
    this.longitude = document.getElementById('longitude');
    this.currentCity = document.getElementById('city');
    this.weatherSummary = document.getElementById('summary');
    this.icon = document.getElementById('weather-icon');
    this.currentTemp = document.getElementById('current-temp');
    this.feelsLike = document.getElementById('feels-like');
    this.humidity = document.getElementById('humidity');
    this.minTemp = document.getElementById('min-temp');
    this.maxTemp = document.getElementById('max-temp');
    this.sunrise = document.getElementById('sunrise');
    this.sunset = document.getElementById('sunset');
    this.pressure = document.getElementById('pressure');
    this.visibility = document.getElementById('visibility');
    this.windSpeed = document.getElementById('wind-speed');
    this.windDirection = document.getElementById('wind-direction');

    this.loader = document.getElementById('loader');
    this.errorMessage = document.getElementById('error-message');
  }

  outputWeatherData(object) {
    this.latitude.innerHTML = object.latitude;
    this.longitude.innerHTML = object.longitude;
    this.currentCity.innerHTML = object.city;
    this.weatherSummary.innerHTML = this.firstLetterToUppercase(object.summary);
    this.icon.setAttribute(
      'src',
      `http://openweathermap.org/img/wn/${object.iconCode}@2x.png`
    );
    this.currentTemp.innerHTML = `${this.kelvinToCelsius(
      object.currentTemp
    )}°C`;

    this.feelsLike.innerHTML = `${this.kelvinToCelsius(object.feelsLike)}°C`;
    this.humidity.innerHTML = `${object.humidity}%`;
    this.minTemp.innerHTML = `${this.kelvinToCelsius(object.minTemp)}°C`;
    this.maxTemp.innerHTML = `${this.kelvinToCelsius(object.maxTemp)}°C`;
    this.sunrise.innerHTML = this.determineMilitaryTime(object.sunrise);
    this.sunset.innerHTML = this.determineMilitaryTime(object.sunset);
    this.pressure.innerHTML = `${object.pressure}pa`;
    this.visibility.innerHTML = `${object.visibility}km`;
    this.windSpeed.innerHTML = `${object.windSpeed}mph`;
    this.windDirection.innerHTML = this.determineWindDirection(
      object.windDirection
    );
  }

  firstLetterToUppercase(string) {
    return string
      .split(' ')
      .map((word) => {
        return word.substring(0, 1).toUpperCase() + word.substring(1);
      })
      .join(' ');
  }

  kelvinToCelsius(number) {
    return (number - 273.15).toFixed(1);
  }

  determineMilitaryTime(seconds) {
    let milliseconds = seconds * 1000;
    let sunrise = new Date(milliseconds);

    let hours = sunrise.getHours().toString();
    let minutes = sunrise.getMinutes().toString();

    return (hours + minutes).length === 3
      ? `0${hours}${minutes}`
      : `${hours}${minutes}`;
  }

  determineWindDirection(number) {
    if ((number >= 337.5 && number <= 360) || (number >= 0 && number < 22.5)) {
      return 'North';
    } else if (number >= 22.5 && number < 67.5) {
      return 'North East';
    } else if (number >= 67.5 && number < 112.5) {
      return 'East';
    } else if (number >= 112.5 && number < 157.5) {
      return 'South East';
    } else if (number >= 157.5 && number < 202.5) {
      return 'South';
    } else if (number >= 202.5 && number < 247.5) {
      return 'South West';
    } else if (number >= 247.5 && number < 292.5) {
      return 'West';
    } else if (number >= 292.5 && number < 337.5) {
      return 'North West';
    } else {
      return 'Unknown';
    }
  }

  activateLoader() {
    this.loader.style.opacity = '1';
  }

  deactivateLoader() {
    this.loader.style.opacity = '0';
  }

  persistCityToLocalStorage(city) {
    localStorage.setItem('city', city);
  }
}
