const title = document.querySelector("h1");
const date = document.querySelectorAll("p")[0];
const weather = document.querySelectorAll("p")[1];

const getCoordinates = () => {
  return navigator.geolocation.getCurrentPosition(getWeather);
};

const getWeather = async (position) => {
  const longitude = position.coords.longitude;
  const latitude = position.coords.latitude;

  const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${latitude}%2C${longitude}`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '2bfb168cc2msh0d23d392e6cfe3cp1eb3bbjsne04afa55e429',
      'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
    }
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

  title.textContent = `${temperature.location.name}, ${temperature.location.country}`;

  date.textContent = currentDate;

  weather.textContent = `${temperature.current.temp_c}°C`;
};

getCoordinates();
