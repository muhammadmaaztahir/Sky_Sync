const newAPIKey = '7VP7SG2ZNS6YQVAL8D9GK2D5D';
const cityName = 'Karachi';
const newAPIEndpoint = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}?unitGroup=metric&key=${newAPIKey}&contentType=json`;

document.addEventListener('DOMContentLoaded', function () {
    async function fetchData(cityName) {
        const newAPIEndpoint = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}?unitGroup=metric&key=${newAPIKey}&contentType=json`;

        try {
            const response = await fetch(newAPIEndpoint);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            updateUI(data, cityName);
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            handleInvalidCity();
        }
    }

    function getWeather() {
        const cityInput = document.getElementById('cityInput');
        const cityName = cityInput.value.trim();

        if (cityName === '') {
            return;
        }
        fetchData(cityName);
        cityInput.value = '';
    }

    const searchButton = document.getElementById('searchButton');
    searchButton.addEventListener('click', getWeather);

    function updateUI(data, cityName) {
        document.getElementById('cityName').textContent = cityName;
        const invalidCityMsg = document.getElementById('invalidCityMsg');
        invalidCityMsg.style.display = 'none';
        const temp3Elements = document.querySelectorAll('.temp_3');
        const temp4Elements = document.querySelectorAll('.temp_4');
        const temp5Elements = document.querySelectorAll('.temp_5');

        if (data && Object.keys(data).length > 0) {
            document.getElementById('Temp').textContent = data.currentConditions.temp;
            document.getElementById('Feels_like').textContent = data.currentConditions.feelslike;
            document.getElementById('Humidity').textContent = data.currentConditions.humidity;
            document.getElementById('Wind_speed').textContent = data.currentConditions.windspeed;
            document.getElementById('Pressure').textContent = data.currentConditions.pressure;
            document.getElementById('Visibility').textContent = data.currentConditions.visibility;
            const sunsetTime24Hour = data.currentConditions.sunset;
            const sunsetTime12Hour = convertTimeTo12HourFormat(sunsetTime24Hour);
            document.getElementById('Sunset').textContent = sunsetTime12Hour;

            temp3Elements.forEach(element => {
                element.style.display = 'inline-block';
            });
            temp4Elements.forEach(element => {
                element.style.display = 'inline-block';
            });
            temp5Elements.forEach(element => {
                element.style.display = 'inline-block';
            });

            const weatherIcon = data.currentConditions.icon;
            const weatherIconElement = document.querySelector('.weather-icon');
            const iconMappings = {
                'clear-day': 'Icons/clear-day.png',
                'clear-night': 'Icons/clear-night.png',
                'cloudy': 'Icons/cloudy.png',
                'fog': 'Icons/fog.png',
                'heavy-rain': 'Icons/heavy-rain.png',
                'partly-cloudy-day': 'Icons/partly-cloudy-day.png',
                'partly-cloudy-night': 'Icons/partly-cloudy-night.png',
                'rain': 'Icons/rain.png',
                'showers-day': 'Icons/showers-day.png',
                'showers-night': 'Icons/showers-night.png',
                'snow-showers-day': 'Icons/snow-showers-day.png',
                'snow-showers-night': 'Icons/snow-showers-night.png',
                'snow-night': 'Icons/snow.png',
                'sunny': 'Icons/sunny.png',
                'thunder-rain': 'Icons/thunder-rain.png',
                'thunder-showers-day': 'Icons/thunder-showers-day.png',
                'thunder-showers-night': 'Icons/thunder-showers-night.png',
                'thunderstorm': 'Icons/thunderstorm.png',
                'wind': 'Icons/wind.png',
            }

            if (iconMappings[weatherIcon]) {
                weatherIconElement.src = iconMappings[weatherIcon];
                weatherIconElement.style.display = 'inline-block';
            }

            else {
                weatherIconElement.style.display = 'none';
            }
        }

        else {
            temp3Elements.forEach(element => {
                element.style.display = 'none';
            });
            temp4Elements.forEach(element => {
                element.style.display = 'none';
            });
            temp5Elements.forEach(element => {
                element.style.display = 'none';
            });

            clearWeatherData();
            handleInvalidCity();
        }
    }

    function convertTimeTo12HourFormat(timeString) {
        const [hour, minute] = timeString.split(':').map(Number);
        const time = new Date(0, 0, 0, hour, minute)
        let formattedHour = time.getHours();
        const amPm = formattedHour >= 12 ? 'PM' : 'AM';
        formattedHour = formattedHour % 12 || 12;
        const formattedMinute = String(time.getMinutes()).padStart(2, '0');
        return `${formattedHour}:${formattedMinute} ${amPm}`;
    }


    function handleInvalidCity() {
        document.getElementById('cityName').textContent = '';
        const weatherIconElement = document.querySelector('.weather-icon');
        weatherIconElement.style.display = 'none';
        document.getElementById('invalidCityMsg').style.display = 'inline';
        validSearchPerformed = false;
        const temp3Elements = document.querySelectorAll('.temp_3');
        const temp4Elements = document.querySelectorAll('.temp_4');
        const temp5Elements = document.querySelectorAll('.temp_5');

        temp3Elements.forEach(element => {
            element.style.display = 'none';
        });
        temp4Elements.forEach(element => {
            element.style.display = 'none';
        });
        temp5Elements.forEach(element => {
            element.style.display = 'none';
        });
        clearWeatherData();
    }

    function hideInvalidCityMsg() {
        document.getElementById('invalidCityMsg').style.display = 'none';
    }

    async function getDefaultWeather() {
        const defaultCity = 'Karachi';
        await fetchData(cityName);
        const unitElements = document.querySelectorAll('.Icons');
        unitElements.forEach(element => {
            element.style.display = 'none';
        });
    }

    function handleKeyPress(event) {
        if (event.key === 'Enter') {
            getWeather();
        }
    }

    function clearWeatherData() {
        document.getElementById('Temp').textContent = '';
        document.getElementById('Feels_like').textContent = '';
        document.getElementById('Humidity').textContent = '';
        document.getElementById('Wind_speed').textContent = '';
        document.getElementById('Pressure').textContent = '';
        document.getElementById('Visibility').textContent = '';
        document.getElementById('Sunset').textContent = '';
    }

    document.addEventListener('keypress', handleKeyPress);
    getDefaultWeather();
});