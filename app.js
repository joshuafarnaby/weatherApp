import { Weather } from './weather.js';
import { UI } from './ui.js';

const changeCityForm = document.getElementById('form');

window.onload = function () {
  const ui = new UI();
  const w = new Weather();

  ui.playLoader();
  ui.showLoader();
  ui.removeErrorMessage();

  const currentCity =
    localStorage.getItem('city') !== null
      ? localStorage.getItem('city')
      : 'London';

  w.getCityFromList(currentCity).then((data) => {
    const id = w.getCityID(data);

    w.fetchWeatherData(id)
      .then((data) => {
        const formattedData = w.formatResponseData(data);
        ui.outputWeatherData(formattedData);
        setTimeout(() => {
          ui.removeLoader();
        }, 1000);
      })
      .catch((error) => {
        setTimeout(() => {
          ui.pauseLoader();
          ui.displayErrorMessage(`Error ${error.cod}: Please Try Again`);
        }, 1000);
      });
  });
};

changeCityForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const ui = new UI();
  const w = new Weather();

  ui.playLoader();
  ui.showLoader();
  ui.removeErrorMessage();

  const newCity = document.getElementById('new-city').value;
  document.getElementById('new-city').value = '';

  w.getCityFromList(newCity)
    .then((data) => {
      const id = w.getCityID(data);

      w.fetchWeatherData(id)
        .then((data) => {
          const formattedData = w.formatResponseData(data);
          ui.outputWeatherData(formattedData);

          ui.persistCityToLocalStorage(newCity);

          setTimeout(() => {
            ui.removeLoader();
          }, 1000);
        })
        .catch((error) => console.log(error));
    })
    .catch((error) => {
      setTimeout(() => {
        ui.pauseLoader();
        ui.displayErrorMessage(error);
      }, 1500);
    });
});
