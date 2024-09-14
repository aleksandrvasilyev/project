import { API_KEY_FOURSQUARE } from "../../api-keys.js";
import {
  API_PLACE_URL,
  API_SEARCH_URL,
  HINTS_ELEMENT,
  SEARCH_CITY_ELEMENT,
} from "../constants.js";
import { renderResult, showPlace } from "../view/renderResult.js";
import { executeSearch } from "./service/executeSearch.js";
import { fetchData } from "./service/fetchData.js";
import { inputCityAutocomplete } from "./service/inputCityAutocomplete.js";

export const resultInit = (city, startDate, endDate, location) => {
  getResults(location);
  renderResult(city, startDate, endDate);
  inputCityAutocomplete();
  executeSearch();
};

const getResults = async (location) => {
  const headers = {
    headers: {
      Authorization: API_KEY_FOURSQUARE,
    },
  };

  const { latitude, longitude } = JSON.parse(location);
  const coordinates = `${latitude},${longitude}`;
  const data = await fetchData(`${API_SEARCH_URL}${coordinates}`, headers);
  const ids = data.results.map((value) => value.fsq_id);

  ids.forEach(async (id) => {
    const dataPlace = await fetchData(
      API_PLACE_URL.replace("place_id", id),
      headers
    );

    const name = dataPlace.name;
    const description = dataPlace.description;
    const image =
      dataPlace.photos[0].prefix + "original" + dataPlace.photos[0].suffix;

    showPlace(name, description, image);
  });
};
