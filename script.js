
async function fetchWeather() {
    document.getElementById('weather').innerHTML = 'Загрузка данных о погоде...';

    try {
        
        const geoResponse = await fetch('https://get.geojs.io/v1/ip/geo.json');
        const geoData = await geoResponse.json();
        const location = `${geoData.city}, ${geoData.region}, ${geoData.country}`;
        document.getElementById('location').innerHTML = `Ваше местоположение: ${location}`;


        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${geoData.latitude}&longitude=${geoData.longitude}&current_weather=true`;

        
        const weatherResponse = await fetch(weatherUrl);
        const weatherData = await weatherResponse.json();

        
        setTimeout(() => {
            if (weatherData && weatherData.current_weather) {
                const currentWeather = weatherData.current_weather;
                const weather = `Температура: <span class="temperature">${currentWeather.temperature}°C</span>, 
                                Погода: <span class="weather-detail">${decodeWeatherCode(currentWeather.weather_code)}</span>,
                                Скорость ветра: <span class="wind-speed">${currentWeather.windspeed} km/h</span>,
                                Код погоды: <span class="code">${currentWeather.weather_code}</span>`;
                document.getElementById('weather').innerHTML = weather;
            } else {
                document.getElementById('weather').innerHTML = 'Данные о погоде недоступны.';
            }
        }, 1500);
    } catch (error) {
        console.error('Failed to fetch location or weather:', error);
        document.getElementById('weather').innerHTML = 'Не удалось загрузить данные о погоде.';
    }
}

function decodeWeatherCode(code) {
    const codes = {
        'clear_sky': 'Ясно',
        'mainly_clear': 'В основном ясно',
        'partly_cloudy': 'Переменная облачность',
        'overcast': 'Пасмурно',
        'fog': 'Туман',
        };
    return codes[code] || 'Недоступно';
}

document.addEventListener('DOMContentLoaded', fetchWeather);
