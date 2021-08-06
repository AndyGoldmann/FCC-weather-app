let currentUnitCelsius;
const errorMessage = document.createElement("h1");
errorMessage.textContent = "Something has gone wrong, try later";

document.addEventListener("DOMContentLoaded", () => {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lon = position.coords.longitude;
      const lat = position.coords.latitude;
      getWeather(lon, lat);
    },
    (error) => {
      console.log(error);
      document.querySelector("#app").appendChild(errorMessage);
    }
  );
});

async function getWeather(lon, lat) {
  try {
    const url = `https://weather-proxy.freecodecamp.rocks/api/current?lon=${lon}&lat=${lat}`;
    const data = await fetch(url);
    const weather = await data.json();
    currentUnitCelsius = Math.round(weather.main.temp);
    const tempUnit = "C";

    document.querySelector("#city").append(weather.name);
    document.querySelector("#country").append(weather.sys.country);
    document.querySelector("#temp").append(`${currentUnitCelsius} °`);
    document.querySelector("#tempUnit").append(tempUnit);
    document
      .querySelector("#description")
      .append(weather.weather[0].description);

    const img = document.querySelector("#imgDesc");
    img.setAttribute("src", `${weather.weather[0].icon}`);
  } catch (error) {
    console.log(error);
  }
}

const changeTempUnit = () => {
  const currentUnit = document.querySelector("#tempUnit");
  const newUnit = currentUnit.textContent === "C" ? "F" : "C";
  const temp = document.querySelector("#temp");
  const fahrenheitUnit = Math.round((parseInt(temp.textContent) * 9) / 5) + 32;

  currentUnit.textContent = newUnit;

  if (newUnit === "F") {
    temp.textContent = `${fahrenheitUnit} °`;
  } else {
    temp.textContent = `${currentUnitCelsius} °`;
  }
};

document.querySelector("#tempUnit").addEventListener("click", changeTempUnit);
