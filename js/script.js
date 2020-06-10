let chooseCity = document.querySelector('#choose_city');
let currentCityChoosed = '';

document.addEventListener('DOMContentLoaded', function () {
  let instances = M.FormSelect.init(chooseCity);
});

chooseCity.onchange = function () {
  currentCityChoosed = this.value;
  cityWeather();
  clearWeatherOut();
};

function cityWeather() {
  fetch(
    `http://api.openweathermap.org/data/2.5/forecast?id=${currentCityChoosed}&appid=9443ba5433385fbddc1433f445b2f66f`
  )
    .then(function (resp) {
      return resp.json(); // convert data to json
    })
    .then(function (data) {
      /////////////////////////////////////////////
      /// Получаю весь массив Unix Time времени ///
      /////////////////////////////////////////////
      let arrayData = data.list;
      console.log(arrayData);
      function getAllTime() {
        let outAllTime = [];
        for (let i = 0; i < arrayData.length; i++) {
          outAllTime.push(arrayData[i].dt);
        }
        return outAllTime;
      }
      /////////////////////////////////////////////
      /////////////////////////////////////////////
      /////////////////////////////////////////////

      ////////////////////////////////////////////////////////
      /// Получаю полночь сегодняшнего и завтрешнего дня /////
      /// и создаю массив пяти дней для получения прогноза ///
      ////////////////////////////////////////////////////////
      let today, tomorrow;
      let date = new Date();
      let plusOneDay = 24 * 60 * 60;
      let arrayDays = {};
      today = Math.round(date.setHours(0, 0, 0, 0) / 1000 + 7200); // полночь текущего дня
      tomorrow = Math.round(date.setHours(24, 0, 0, 0) / 1000 + 7200); // полночь следующего дня
      for (let i = 1; i < 6; i++) {
        let arrayUnixTime = [];
        for (let k = today; k < tomorrow; k = k + 3 * 60 * 60) {
          if (getAllTime().indexOf(k) !== -1) {
            arrayUnixTime.push(k);
          }
        }
        today = today + plusOneDay;
        tomorrow = tomorrow + plusOneDay;
        arrayDays[i] = arrayUnixTime;
      }
      //console.log(arrayDays);
      ////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////

      ////////////////////////////////////////////////////////
      /// Разделяю масив полученных дней для использования ///
      ////////////////////////////////////////////////////////
      let firstDay, secondDay, thirdDay, fourthDay, fiveDay;
      for (let key in arrayDays) {
        for (let i = 0; i < arrayDays[key].length; i++) {
          if (key == 1) {
            firstDay = arrayDays[key];
          }
          if (key == 2) {
            secondDay = arrayDays[key];
          }
          if (key == 3) {
            thirdDay = arrayDays[key];
          }
          if (key == 4) {
            fourthDay = arrayDays[key];
          }
          if (key == 5) {
            fiveDay = arrayDays[key];
          }
        }
      }
      ////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////

      /////////////////////////////////////////////////////////////////
      /// Нахожу нулевые индексы каждого нового дня и создаю массив ///
      /// дней недели для вывода на страницу //////////////////////////
      /////////////////////////////////////////////////////////////////
      let zeroIndexFirstDay,
        zeroIndexSecondDay,
        zeroIndexThirdDay,
        zeroIndexFourthDay,
        zeroIndexFiveDay;
      let startSearch = [];
      for (let i = 0; i < arrayData.length; i++) {
        startSearch.push(arrayData[i].dt);
        zeroIndexFirstDay = startSearch.indexOf(firstDay[0]);
        zeroIndexSecondDay = startSearch.indexOf(secondDay[0]);
        zeroIndexThirdDay = startSearch.indexOf(thirdDay[0]);
        zeroIndexFourthDay = startSearch.indexOf(fourthDay[0]);
        zeroIndexFiveDay = startSearch.indexOf(fiveDay[0]);
      }
      /////////////////////////////////////////////////////////////////
      /////////////////////////////////////////////////////////////////
      /////////////////////////////////////////////////////////////////

      /////////////////////////////////////////////////
      /// Создаю массив дней недели и присваеваю их ///
      /// по нулевым индексам дней ////////////////////
      /////////////////////////////////////////////////
      const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      let firstDayWeek, secondDayWeek, thirdDayWeek, fourthDayWeek, fiveDayWeek;
      firstDayWeek = `${dayNames[new Date(arrayData[zeroIndexFirstDay].dt * 1000).getDay()]} 
                        ${new Date(arrayData[zeroIndexFirstDay].dt * 1000).getDate()}`;
      secondDayWeek = `${dayNames[new Date(arrayData[zeroIndexSecondDay].dt * 1000).getDay()]} 
                        ${new Date(arrayData[zeroIndexSecondDay].dt * 1000).getDate()}`;
      thirdDayWeek = `${dayNames[new Date(arrayData[zeroIndexThirdDay].dt * 1000).getDay()]} 
                        ${new Date(arrayData[zeroIndexThirdDay].dt * 1000).getDate()}`;
      fourthDayWeek = `${dayNames[new Date(arrayData[zeroIndexFourthDay].dt * 1000).getDay()]} 
                        ${new Date(arrayData[zeroIndexFourthDay].dt * 1000).getDate()}`;
      fiveDayWeek = `${dayNames[new Date(arrayData[zeroIndexFiveDay].dt * 1000).getDay()]} 
                        ${new Date(arrayData[zeroIndexFiveDay].dt * 1000).getDate()}`;
      /////////////////////////////////////////////////
      /////////////////////////////////////////////////
      /////////////////////////////////////////////////

      //////////////////////////////////////////////////
      /// Получаю все селекторы и вывожу на страницу ///
      //////////////////////////////////////////////////
      let addStyle = document.querySelector('.weather-position');
      let outFirstDay = document.querySelector('.first-day');
      let outSecondDay = document.querySelector('.second-day');
      let outThirdDay = document.querySelector('.third-day');
      let outFourthDay = document.querySelector('.fourth-day');
      let outFiveDay = document.querySelector('.five-day');
      let out_firstWeekDay, out_firstTemperature, out_firstDayWeather, out_firstImage;
      let out_secondWeekDay, out_secondTemperature, out_secondDayWeather, out_secondImage;
      let out_thirdWeekDay, out_thirdTemperature, out_thirdDayWeather, out_thirdImage;
      let out_fourthWeekDay, out_fourthTemperature, out_fourthDayWeather, out_fourthImage;
      let out_fiveWeekDay, out_fiveTemperature, out_fiveDayWeather, out_fiveImage;

      // Добавляю стили на основной блок
      addStyle.classList.add('add-style');

      // Ввод прогноза погоды для первого дня
      out_firstWeekDay = `<div class="week-day">${firstDayWeek}</div>`;
      out_firstTemperature = `<div class="temperature">${Math.round(
        arrayData[zeroIndexFirstDay].main.temp - 273
      )}&deg;</div>`;
      out_firstDayWeather = `<div class="weather">${arrayData[zeroIndexFirstDay].weather[0].main}</div>`;
      out_firstImage = `<div class="image"><img src="https://openweathermap.org/img/wn/${arrayData[zeroIndexFirstDay].weather[0].icon}@2x.png"></div>`;

      // Ввод прогноза погоды для второго дня
      out_secondWeekDay = `<div class="week-day">${secondDayWeek}</div>`;
      out_secondTemperature = `<div class="temperature">${Math.round(
        arrayData[zeroIndexSecondDay].main.temp - 273
      )}&deg;</div>`;
      out_secondDayWeather = `<div class="weather">${arrayData[zeroIndexSecondDay].weather[0].main}</div>`;
      out_secondImage = `<div class="image"><img src="https://openweathermap.org/img/wn/${arrayData[zeroIndexSecondDay].weather[0].icon}@2x.png"></div>`;

      // Ввод прогноза погоды для третьего дня
      out_thirdWeekDay = `<div class="week-day">${thirdDayWeek}</div>`;
      out_thirdTemperature = `<div class="temperature">${Math.round(
        arrayData[zeroIndexThirdDay].main.temp - 273
      )}&deg;</div>`;
      out_thirdDayWeather = `<div class="weather">${arrayData[zeroIndexThirdDay].weather[0].main}</div>`;
      out_thirdImage = `<div class="image"><img src="https://openweathermap.org/img/wn/${arrayData[zeroIndexThirdDay].weather[0].icon}@2x.png"></div>`;

      // Ввод прогноза погоды для четвертого дня
      out_fourthWeekDay = `<div class="week-day">${fourthDayWeek}</div>`;
      out_fourthTemperature = `<div class="temperature">${Math.round(
        arrayData[zeroIndexFourthDay].main.temp - 273
      )}&deg;</div>`;
      out_fourthDayWeather = `<div class="weather">${arrayData[zeroIndexFourthDay].weather[0].main}</div>`;
      out_fourthImage = `<div class="image"><img src="https://openweathermap.org/img/wn/${arrayData[zeroIndexFourthDay].weather[0].icon}@2x.png"></div>`;

      // Ввод прогноза погоды для пятого дня
      out_fiveWeekDay = `<div class="week-day">${fiveDayWeek}</div>`;
      out_fiveTemperature = `<div class="temperature">${Math.round(
        arrayData[zeroIndexFiveDay].main.temp - 273
      )}&deg;</div>`;
      out_fiveDayWeather = `<div class="weather">${arrayData[zeroIndexFiveDay].weather[0].main}</div>`;
      out_fiveImage = `<div class="image"><img src="https://openweathermap.org/img/wn/${arrayData[zeroIndexFiveDay].weather[0].icon}@2x.png"></div>`;

      // Вывод прогноза погоды для первого дня
      outFirstDay.innerHTML += out_firstWeekDay;
      outFirstDay.innerHTML += out_firstTemperature;
      outFirstDay.innerHTML += out_firstDayWeather;
      outFirstDay.innerHTML += out_firstImage;

      // Вывод прогноза погоды для второго дня
      outSecondDay.innerHTML += out_secondWeekDay;
      outSecondDay.innerHTML += out_secondTemperature;
      outSecondDay.innerHTML += out_secondDayWeather;
      outSecondDay.innerHTML += out_secondImage;

      // Вывод прогноза погоды для третьего дня
      outThirdDay.innerHTML += out_thirdWeekDay;
      outThirdDay.innerHTML += out_thirdTemperature;
      outThirdDay.innerHTML += out_thirdDayWeather;
      outThirdDay.innerHTML += out_thirdImage;

      // Вывод прогноза погоды для четвертого дня
      outFourthDay.innerHTML += out_fourthWeekDay;
      outFourthDay.innerHTML += out_fourthTemperature;
      outFourthDay.innerHTML += out_fourthDayWeather;
      outFourthDay.innerHTML += out_fourthImage;

      // Вывод прогноза погоды для пятого дня
      outFiveDay.innerHTML += out_fiveWeekDay;
      outFiveDay.innerHTML += out_fiveTemperature;
      outFiveDay.innerHTML += out_fiveDayWeather;
      outFiveDay.innerHTML += out_fiveImage;
      //////////////////////////////////////////////////
      //////////////////////////////////////////////////
      //////////////////////////////////////////////////
    })
    .catch(function () {
      // catch any errors
    });
}

function clearWeatherOut() {
  document.querySelector('.first-day').innerHTML = '';
  document.querySelector('.second-day').innerHTML = '';
  document.querySelector('.third-day').innerHTML = '';
  document.querySelector('.fourth-day').innerHTML = '';
  document.querySelector('.five-day').innerHTML = '';
}
