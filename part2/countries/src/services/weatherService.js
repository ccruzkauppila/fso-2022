import axios from "axios";

const getWeather = (lat, lon) => {
  const api_key = import.meta.env.VITE_SOME_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`;
  axios.get(url).then((res) => res);
};

export default { getWeather };
