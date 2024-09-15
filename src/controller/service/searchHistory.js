import { renderError } from "../../view/components/renderError.js";

export const saveSearch = (city, startDate, endDate, location) => {
  try {
    const searchHistory =
      JSON.parse(sessionStorage.getItem("searchHistory")) || [];

    const searchValue = JSON.stringify({
      city,
      startDate,
      endDate,
      location,
    });

    const isDuplicate = searchHistory.some((value) => {
      return searchValue === value;
    });

    if (!isDuplicate) {
      searchHistory.push(searchValue);
      sessionStorage.setItem("searchHistory", JSON.stringify(searchHistory));
    }
  } catch (error) {
    renderError(error);
    throw error;
  }
};
