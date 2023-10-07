import axios from "axios";

let allCountries = [];

axios.get("https://studies.cs.helsinki.fi/restcountries/api/all").then((response) => {
  allCountries = response.data;
});
const getCountries = (filter) => {
  const matches = allCountries.filter((country) =>
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  );
  return matches;
};

export default { getCountries };
