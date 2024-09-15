import {
  DATA_LOCATION,
  END_DATE,
  HINT_ELEMENT,
  SEARCH_BUTTON_ID,
  SEARCH_CITY_ELEMENT,
  START_DATE,
} from "../../constants.js";
import { renderError } from "../../view/components/renderError.js";
import { setSearchValue } from "../../view/components/renderSearchHints.js";
import { resultsInit } from "../resultsPage.js";
import { saveSearch } from "./searchHistory.js";

export const executeSearch = async () => {
  const searchButton = document.getElementById(SEARCH_BUTTON_ID);
  const searchCity = document.getElementById(SEARCH_CITY_ELEMENT);
  const startDate = document.getElementById(START_DATE);
  const endDate = document.getElementById(END_DATE);

  searchButton.onclick = (event) => {
    event.preventDefault();

    const firstHint = document.querySelector(HINT_ELEMENT);

    if (!searchCity.getAttribute(DATA_LOCATION)) {
      if (firstHint) {
        setSearchValue(
          searchCity,
          firstHint.innerText,
          firstHint.getAttribute(DATA_LOCATION)
        );
      } else {
        renderError("Enter city name!");
        throw new Error(error.message);
      }
    }

    const params = [
      searchCity.value,
      startDate.value,
      endDate.value,
      searchCity.getAttribute(DATA_LOCATION),
    ];

    resultsInit(...params);
    saveSearch(...params);
  };
};
