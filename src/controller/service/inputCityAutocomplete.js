import { API_KEY_FOURSQUARE } from "../../../api-keys.js";
import {
  API_AUTOCOMPLETE_CITY_URL,
  DATA_LOCATION,
  HINTS_ELEMENT,
  SEARCH_CITY_ELEMENT,
} from "../../constants.js";
import {
  clearHints,
  renderHints,
  setSearchValue,
  toggleHintsVisibility,
} from "../../view/components/renderSearchHints.js";
import { fetchData } from "./fetchData.js";

export const inputCityAutocomplete = () => {
  const searchCity = document.getElementById(SEARCH_CITY_ELEMENT);
  const hintsElement = document.getElementById(HINTS_ELEMENT);

  let searchTimeout = 0;

  searchCity.onkeyup = () => {
    clearTimeout(searchTimeout);

    if (searchCity.value.trim().length === 0) {
      clearHints();
      searchCity.removeAttribute(DATA_LOCATION);
      return;
    }

    searchTimeout = setTimeout(async () => {
      try {
        const data = await fetchData(
          `${API_AUTOCOMPLETE_CITY_URL}${searchCity.value}`,
          {
            headers: {
              Authorization: API_KEY_FOURSQUARE,
            },
          }
        );

        renderHints(data);
      } catch (error) {
        console.log(error);
      }
    }, 300);
  };
  toggleHintsVisibility(searchCity, hintsElement);

  hintsElement.addEventListener("click", (event) => {
    setSearchValue(
      searchCity,
      event.target.innerText,
      event.target.getAttribute(DATA_LOCATION)
    );
    clearHints();
  });
};
