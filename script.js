const apiKey = "YOUR_API_KEY_HERE"; // Replace with your OpenWeatherMap API key

function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  if (!city) {
    alert("Please enter a city name.");
    return;
  }
  fetchWeatherData(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
}

function getLocationWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      fetchWeatherData(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`);
    }, error => {
      alert("Unable to retrieve location.");
    });
  } else {
    alert("Geolocation not supported by this browser.");
  }
}

function fetchWeatherData(url) {
  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error("Weather data not found.");
      return response.json();
    })
    .then(data => {
      const html = `
        <strong>${data.name}, ${data.sys.country}</strong><br>
        🌡️ Temp: ${data.main.temp}°C<br>
        🌥️ Weather: ${data.weather[0].description}<br>
        💧 Humidity: ${data.main.humidity}%<br>
        🌬️ Wind: ${data.wind.speed} m/s
      `;
      document.getElementById("weatherDisplay").innerHTML = html;
    })
    .catch(error => {
      document.getElementById("weatherDisplay").textContent = error.message;
    });
}
