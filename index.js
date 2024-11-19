function refreshWeather(currentweather) {
    //document.write(currentweather.data.temperature.current)
    //let currentTemperature=Math.round(currentweather.data.temperature.current);
    //document.write(currentTemperature);
    //display the temperature
    let currentTemperatureValue = document.querySelector("#currenttemperaturevalue");

    //currentTemperatureValue.innerHTML=currentTemperature;
    //this is a shorter way of doing the exact same thing the commented codes do.
    currentTemperatureValue.innerHTML =
        Math.round(currentweather.data.temperature.current);

    //display the weather description
    let weatherDescription = document.querySelector("#weatherdescription");
    weatherDescription.innerHTML = currentweather.data.condition.description;

    let currentWeatherIcon = document.querySelector("#weather-app-icon");
    currentWeatherIcon.innerHTML = '<img scr="${currentweather.data.condition.icon_url}" alt="not loading" class="weather-app-icon"/>';
    console.log(currentweather.data);

    //display humidity
    let humidity = document.querySelector("#Humidity");
    humidity.innerHTML = '${currentweather.data.temeperature.humidity}%';

    //display windspeed
    let windSpeed = document.querySelector("#windSpeed");
    windspeed.innerHTML = '${currentweather.data.wind.speed}knots';

    //display day and time
    let currentTime = document.querySelector("#currenttime");
    let date = new Date(currentweather.data.time * 1000);
    currentTime.innerHTML = formatDate(date);
}
function formatDate(date) {
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let days = ["Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
    ]
    let day = days[date.getDay()];

    if (minutes < 10) {
        minutes = '0${minutes}';
    }
    return '${day}${hours}:${minutes}';
}

function searchCity(currentcityname) {
    let apikey = "73dof19a030ad06t05b21b4860d";
    let apiurl = 'https//api.shecodes.io/weather/v1/current?query=${currentcityname}&key=${apikey}';
    //console.log(currentcityName);
    axios.get(apiurl).then(refreshWeather);
    //console.log(apiurl);
}

function displayCity(event) {
    event.preventDefault();

    let cityName = document.querySelector("#city-name");
    let cityNamedisplayed = document.querySelector("h3");
    cityNamedisplayed.innerHTML = cityName.value;

    currentcityname = cityName.value
    searchCity(currentcityname);
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", displayCity);