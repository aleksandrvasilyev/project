import { SEARCH_CITY_ELEMENT } from "../constants.js";
import { renderError } from "../view/components/renderError.js";
import { setSearchValue } from "../view/components/renderSearchHints.js";
import {
  renderResultPage,
  renderPlaces,
  renderEvents,
} from "../view/renderResultsPage.js";
import { executeSearch } from "./service/executeSearch.js";
import { getEvents } from "./service/getEvents.js";
import { getPlaces } from "./service/getPlaces.js";
import { inputCityAutocomplete } from "./service/inputCityAutocomplete.js";
import { navigation } from "./service/router.js";

export const resultsInit = async (city, startDate, endDate, location) => {
  try {
    const latitude = JSON.parse(location).latitude;
    const longitude = JSON.parse(location).longitude;

    await renderResultPage(city, startDate, endDate, location);
    setSearchValue(
      document.getElementById(SEARCH_CITY_ELEMENT),
      city,
      location
    );

    const places = getPlaces(location);
    await renderPlaces(places);

    const events = getEvents(latitude, longitude, startDate, endDate);
    await renderEvents(events);

    inputCityAutocomplete();
    executeSearch();
    navigation();
  } catch (error) {
    renderError(error);
    throw error;
  }
};
