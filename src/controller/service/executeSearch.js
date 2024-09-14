import { END_DATE, SEARCH_CITY_ELEMENT, START_DATE } from "../../constants.js";
import { renderError } from "../../view/components/renderError.js";
import { setSearchValue } from "../../view/components/renderSearchHints.js";
import { resultInit } from "../results.js";

export const executeSearch = async () => {
  const searchButton = document.getElementById("search-button");
  const searchCity = document.getElementById(SEARCH_CITY_ELEMENT);
  const startDate = document.getElementById(START_DATE);
  const endDate = document.getElementById(END_DATE);

  searchButton.onclick = (event) => {
    event.preventDefault();

    const firstHint = document.querySelector(".hint-item");

    if (!searchCity.getAttribute("data-location")) {
      if (firstHint) {
        setSearchValue(
          searchCity,
          firstHint.innerText,
          firstHint.getAttribute("data-location")
        );
      } else {
        renderError("Enter city name!");
        throw new Error(error.message);
      }
    }
    resultInit(
      searchCity.value,
      startDate.value,
      endDate.value,
      searchCity.getAttribute("data-location")
    );
  };
};
