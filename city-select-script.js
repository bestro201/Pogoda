async function fetchWeatherForCity(latitude, longitude) {
    const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data && data.current_weather) {
            return `${data.current_weather.temperature}°C, ${data.current_weather.weather_description}, Wind Speed: ${data.current_weather.windspeed} km/h`;
        } else {
            throw new Error('Weather data not available');
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        return 'Weather data not available';
    }
}

document.getElementById('city-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const select = document.getElementById('city-select');
    const selectedOption = select.options[select.selectedIndex];
    const weatherDisplay = document.getElementById('weather-result');
    weatherDisplay.textContent = 'Loading...';

    const weatherInfo = await fetchWeatherForCity(selectedOption.dataset.lat, selectedOption.dataset.lon);
    weatherDisplay.innerHTML = `<p>${selectedOption.text}: ${weatherInfo}</p>`;
});

document.addEventListener('DOMContentLoaded', () => {
    const cities = [
        { name: "Paris", country: "France", latitude: 48.8566, longitude: 2.3522 },
        { name: "London", country: "UK", latitude: 51.5074, longitude: -0.1278 },
        { name: "Rome", country: "Italy", latitude: 41.9028, longitude: 12.4964 },
        { name: "Berlin", country: "Germany", latitude: 52.5200, longitude: 13.4050 },
        { name: "Warsaw", country: "Poland", latitude: 52.2297, longitude: 21.0122 }
    ];

    const select = document.getElementById('city-select');
    cities.forEach(city => {
        const option = document.createElement('option');
        option.textContent = `${city.name} (${city.country})`;
        option.value = city.name;
        option.dataset.lat = city.latitude;
        option.dataset.lon = city.longitude;
        select.appendChild(option);
    });
});
