const API_KEY = "c09de379c7a0d04a191c4f85b5af139a";

function onGeoSuccess(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    fetch(url)
        .then(respose => respose.json())
        .then(data => {
            const weather = document.querySelector("#weather span:first-child");
            const city = document.querySelector("#weather span:last-child");
            weather.innerText = `${data.weather[0].main} / ${Math.floor(data.main.temp)}°C`;
            city.innerText = data.name;
        })
}

function onGeoError(error) {
    alert("Can't find you. No weather for location.")
}

navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoError);