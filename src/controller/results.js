import { API_KEY_FOURSQUARE } from "../../api-keys.js";
import {
  API_PLACE_URL,
  API_SEARCH_URL,
  HINTS_ELEMENT,
  SEARCH_CITY_ELEMENT,
} from "../constants.js";
import { renderError } from "../view/components/renderError.js";
import { setSearchValue } from "../view/components/renderSearchHints.js";
import { renderResult, renderElement } from "../view/renderResult.js";
import { executeSearch } from "./service/executeSearch.js";
import { fetchData } from "./service/fetchData.js";
import { getEvents } from "./service/getEvents.js";
import { inputCityAutocomplete } from "./service/inputCityAutocomplete.js";

export const resultInit = (city, startDate, endDate, location) => {
  const latitude = JSON.parse(location).latitude;
  const longitude = JSON.parse(location).longitude;

  getResults(location);
  renderResult(city, startDate, endDate, location);
  setSearchValue(document.getElementById(SEARCH_CITY_ELEMENT), city, location);
  inputCityAutocomplete();
  executeSearch();
  getEvents(latitude, longitude, startDate, endDate);
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
    try {
      const dataPlace = await fetchData(
        API_PLACE_URL.replace("place_id", id),
        headers
      );

      const name = dataPlace.name;
      const description = dataPlace.description;
      let image;
      if (dataPlace.photos[0]) {
        image =
          dataPlace.photos[0].prefix + "original" + dataPlace.photos[0].suffix;
      } else {
        image = "";
      }

      renderElement(name, description, image, "places");
    } catch (error) {
      renderError(error.message);
      throw new Error(error.message);
    }
  });
};
