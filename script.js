// API key for OpenWeatherMap API
const API_KEY = "YOUR_API_KEY_HERE";

// Get weather data from OpenWeatherMap API
function getWeatherData(city) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      // Get current weather data
      const currentWeather = data.list[0];
      const cityName = data.city.name;
      const date = moment(currentWeather.dt * 1000).format("MM/DD/YYYY");
      const time = moment(currentWeather.dt * 1000).format("hh:mm:ss");
      const icon = currentWeather.weather[0].icon;
      const temperature = Math.round(currentWeather.main.temp - 273.15);
      const humidity = currentWeather.main.humidity;
      const windSpeed = currentWeather.wind.speed;

      // Update current weather data
      $(".city-name").text(cityName);
      $(".date").text(date);
      $(".time").text(time);
      $(".icon").html(`<img src="http://openweathermap.org/img/wn/${icon}@2x.png" />`);
      $(".temperature").text(`Temperature: ${temperature}°C`);
      $(".humidity").text(`Humidity: ${humidity}%`);
      $(".wind-speed").text(`Wind Speed: ${windSpeed}m/s`);

      // Get forecast data
      const forecastData = data.list.slice(1, 6);
      forecastData.forEach(day => {
        const date = moment(day.dt * 1000).format("MM/DD/YYYY");
        const icon = day.weather[0].icon;
        const temperature = Math.round(day.main.temp - 273.15);
        const humidity = day.main.humidity;
        const windSpeed = day.wind.speed;

        // Create forecast row
        const forecastRow = `
          <div class="forecast-row">
            <div class="date">${date}</div>
            <div class="icon"><img src="http://openweathermap.org/img/wn/${icon}@2x.png" /></div>
            <div class="temperature">${temperature}°C</div>
            <div class="humidity">${humidity}%</div>
            <div class="wind-speed">${windSpeed}m/s</div>
          </div>
        `;

        // Append forecast row to forecast container
        $("#forecast").append(forecastRow);
      });
    });
}

// Handle search form submit
$("#search-form").submit(e => {
  e.preventDefault();

  // Get city input
  const city = $("#city-input").val();

  // Get weather data
  getWeatherData(city);

  // Clear input
  $("#city-input").val("");
});