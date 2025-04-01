const API_KEY = "a9df6a982a38181336b84ceb43df8c9d";

async function getWeather() {
  const city = document.getElementById("city").value;
  console.log(city);
  if (!city) {
    alert("Please enter a city");
  }

  const currentWatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;

  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`;

  const currentWeatherResponse = await fetch(currentWatherUrl);
  const currentWeatherData = await currentWeatherResponse.json();
  displayWeather(currentWeatherData);
}

function displayWeather(data) {
  const temperatureDiv = document.getElementById("temperature-div");
  const weatherInfoDiv = document.getElementById("weather-info");
  const weatherIcon = document.getElementById("weather-icon");
  weatherInfoDiv.innerHTML = "";

  if (data.cod === "404") {
    weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
  } else {
    const cityName = data.name;
    const temperature = Math.round(data.main.temp - 273.15);
    const description = data.weather[0].description;
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

    const temperatureHTML = `<p>${temperature}°C</p>`;

    const weatherHTML = `<p>${cityName}</p> <p>${description}</p>`;

    temperatureDiv.innerHTML = temperatureHTML;
    weatherInfoDiv.innerHTML = weatherHTML;
    weatherIcon.src = iconUrl;
    weatherIcon.style.display = "block";
  }
}
