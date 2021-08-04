document.addEventListener('DOMContentLoaded', () => {
    navigator.geolocation.getCurrentPosition(position =>{
        const lon = position.coords.longitude;
        const lat = position.coords.latitude;
        getWeather(lon, lat);
    });
    
});

async function getWeather(lon, lat) {
    const url = `https://weather-proxy.freecodecamp.rocks/api/current?lon=${lon}&lat=${lat}`
    const data = await fetch(url)
    const weather = await data.json()
    const currentUnitCelsius = Math.round(weather.main.temp);
    const tempUnit = 'C'
    console.log(weather)

    document.querySelector('#city').append(weather.name);
    document.querySelector('#country').append(weather.sys.country);
    document.querySelector('#temp').append(`${currentUnitCelsius} °`);
    document.querySelector('#tempUnit').append(tempUnit);
    document.querySelector('#description').append(weather.weather[0].description)

    const img = document.querySelector('#imgDesc')
    img.setAttribute('src', `${weather.weather[0].icon}`)
};

