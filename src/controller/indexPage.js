import { renderIndex } from "../view/renderIndexPage.js";
import { inputCityAutocomplete } from "./service/inputCityAutocomplete.js";
import { executeSearch } from "./service/executeSearch.js";
import { navigation } from "./service/router.js";

export const indexInit = () => {
  renderIndex();
  inputCityAutocomplete();
  executeSearch();
  navigation();
};
