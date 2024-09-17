import { indexInit } from "../indexPage.js";
import { searchHistoryInit } from "../historyPage.js";
import { HISTORY_LINK, HOME_LINK } from "../../constants.js";

export const navigation = () => {
  const homeLinks = document.querySelectorAll(`.${HOME_LINK}`);
  const historyLink = document.getElementById(HISTORY_LINK);

  homeLinks.forEach((link) => {
    link.onclick = () => {
      indexInit();
    };
  });

  historyLink.onclick = () => {
    searchHistoryInit();
  };
};
