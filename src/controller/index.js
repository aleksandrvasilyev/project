import { renderIndex } from "../view/renderIndex.js";
import { inputCityAutocomplete } from "./service/inputCityAutocomplete.js";
import { executeSearch } from "./service/executeSearch.js";

export const indexInit = () => {
  renderIndex();
  inputCityAutocomplete();
  executeSearch();
};
