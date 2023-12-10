const input = document.querySelector('.input');
const btn = document.querySelector('.btn');
btn.addEventListener('click', function(){
    const value = input.value;
    if(!value && value === undefined){
        return;
    }
    getWeather(value);
})
input.addEventListener('keydown', function(e){
    if(e.key === 'Enter'){
        const value = input.value;
        getWeather(value);
    }
})


async function getWeather(city) {
    try {
      const apiUrl = 'http://api.openweathermap.org/data/2.5/weather';
      const apiKey = '5d066958a60d315387d9492393935c19';
      const units = 'metric';

      const url = `${apiUrl}?q=${city}&units=${units}&APPID=${apiKey}`;

      const response = await fetch(url);
      const data = await response.json();

      renderData(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  }


  function renderData(data) {
    const mainDiv = document.querySelector('.weather-container');
    mainDiv.style.display = 'block'
    if(data.cod === '404'){
        mainDiv.style.color = 'red';
        return mainDiv.innerHTML =  `<h2>${data.message}</h2>`;   
    }
   mainDiv.innerHTML = ` 
   <h2>Weather in ${data.name}</h2>
   <img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png" class="weather-icon" alt="Weather Icon">
   <p>Temperature: ${data.main.temp}°C</p>
   <p>Pressure: ${data.main.pressure} hPa</p>
   <p>Description: ${data.weather[0].description}</p>
   <p>Humidity: ${data.main.humidity}%</p>
   <p>Wind Speed: ${data.wind.speed} m/s</p>
   <p>Wind Direction: ${data.wind.deg}°</p>
   `;
  }
