const apiKey = 'a367538eb9762c8cb7d95a80b491128f';

const citySearch = localStorage.getItem("citySearch");
if(citySearch){
    document.getElementById("cityInput").value = citySearch;
    getWeather();
}

function getWeather(){
    const cityInput = document.getElementById("cityInput");
    const cityName = cityInput.value;

    if(cityName === ""){
        alert("Enter the city name.");
        return;
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`;

    fetch(apiUrl)
        .then(res => res.json())
        .then(data => {
            localStorage.setItem("citySearch",cityName);
            displayForecast(data);
        })
        .catch(error => {
            console.error('error fetching data:', error);
            alert('error fetching forecast data. try again.');
        });
}

function displayForecast(data) {
    const forecastContainer = document.getElementById('forecastContainer');
    forecastContainer.innerHTML = '';

    for(let i = 0; i < data.list.length; i += 8) {
        const forecastData = data.list[i];
        const date = new Date (forecastData.dt * 1000);
        const day = getDayOfWeek(date.getDay());
        const icon = forecastData.weather[0].icon;
        const temperature = forecastData.main.temp;

        const dayCard = document.createElement("div");
        dayCard.classList.add("day-card");
        dayCard.innerHTML = `
            <img src="http://openweathermap.org/img/wn/${icon}.png" alt="${forecastData.weather[0].description}">
            <p>${day}</P>
            <p>${Math.round(temperature)} ˚c</p>
        
        `;

        forecastContainer.appendChild(dayCard)
    }
}

function getDayOfWeek(dayIndex){
    const getDayOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu','Fri', 'Sat'];
    return getDayOfWeek[dayIndex]
}