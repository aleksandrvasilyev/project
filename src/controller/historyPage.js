import {
  renderHistoryResults,
  renderSearchHistory,
} from "../view/renderHistoryPage.js";
import { navigation } from "./service/router.js";

export const searchHistoryInit = async () => {
  renderSearchHistory();
  renderHistoryResults();
  navigation();

};
