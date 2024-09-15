import { indexInit } from "../indexPage.js";
import { searchHistoryInit } from "../historyPage.js";

export const navigation = () => {
  const homeLinks = document.querySelectorAll(".home-link");
  const historyLink = document.getElementById("history-link");

  homeLinks.forEach((link) => {
    link.onclick = () => {
      indexInit();
    };
  });

  historyLink.onclick = () => {
    searchHistoryInit();
  };
};
