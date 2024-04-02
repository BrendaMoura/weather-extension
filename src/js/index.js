const title = document.querySelector("h1");
const date = document.querySelectorAll("p")[0];
const weather = document.querySelectorAll("p")[1];

const getCoordinates = () => {
  return navigator.geolocation.getCurrentPosition(getWeather);
};

const getWeather = async (position) => {
  const longitude = position.coords.longitude;
  const latitude = position.coords.latitude;

  const url = `https://weatherbit-v1-mashape.p.rapidapi.com/current?lon=${longitude}&lat=${latitude}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "2bfb168cc2msh0d23d392e6cfe3cp1eb3bbjsne04afa55e429",
      "X-RapidAPI-Host": "weatherbit-v1-mashape.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();

    showWeather(result);
  } catch (error) {
    console.error(error);
  }
};

const showWeather = (temperature) => {
  const currentDate = new Date().toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
  });

  title.textContent = `${temperature.data[0].city_name}, ${temperature.data[0].country_code}`;

  date.textContent = currentDate;

  weather.textContent = `${temperature.data[0].temp}°C`;
};

getCoordinates();
