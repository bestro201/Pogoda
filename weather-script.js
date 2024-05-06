async function fetchWeatherData(city, latitude, longitude) {
    const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data && data.current_weather) {
            return {
                city: city,
                temperature: data.current_weather.temperature,
                weatherDescription: data.current_weather.weather_description,
                windspeed: data.current_weather.windspeed
            };
        } else {
            throw new Error('Weather data not available');
        }
    } catch (error) {
        console.error('Failed to fetch weather data:', error);
        return { city: city, error: 'Failed to fetch data' };
    }
}

async function displayWeather() {
    const cities = [
        { name: "Paris", country: "France", latitude: 48.8566, longitude: 2.3522 },
        { name: "London", country: "UK", latitude: 51.5074, longitude: -0.1278 },
        { name: "Rome", country: "Italy", latitude: 41.9028, longitude: 12.4964 },
        { name: "Berlin", country: "Germany", latitude: 52.5200, longitude: 13.4050 },
        { name: "Warsaw", country: "Poland", latitude: 52.2297, longitude: 21.0122 }
    ];

    const weatherCards = document.getElementById('cards-container');
    for (let city of cities) {
        const weatherData = await fetchWeatherData(city.name, city.latitude, city.longitude);
        const card = document.createElement('div');
        card.className = 'weather-card';
        card.innerHTML = `
            <h3>${city.name} (${city.country})</h3>
            <p>Temperature: ${weatherData.temperature} °C</p>
            <p>Weather: ${weatherData.weatherDescription}</p>
            <p>Wind Speed: ${weatherData.windspeed} km/h</p>
        `;
        weatherCards.appendChild(card);
    }
}

document.addEventListener('DOMContentLoaded', displayWeather);
