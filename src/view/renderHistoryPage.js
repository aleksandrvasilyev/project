import { resultsInit } from "../controller/resultsPage.js";
import { renderTemplate } from "./renderTemplate.js";

export const renderSearchHistory = () => {
  const searchHistoryContent = `
   <main class="container search-history">
        <div id="history-results">
            <div class="container heading">
              <h1>Search history:</h1>
            </div>
        </div>
   </main>
`;
  renderTemplate(searchHistoryContent);
  document.getElementById("history-link").classList.add("active");
};

export const renderHistoryResults = () => {
  const results = JSON.parse(sessionStorage.getItem("searchHistory"));
  const historyResults = document.getElementById("history-results");

  if (results) {
    results.reverse().forEach((result) => {
      const resultObj = JSON.parse(result);
      const resultElement = document.createElement("div");
      const link = document.createElement("a");
      const p = document.createElement("p");
      link.href = "#";
      resultElement.appendChild(link);
      resultElement.appendChild(p);
      resultElement.classList.add("result");
      link.innerHTML = `${resultObj.city}`;
      p.innerHTML = `${resultObj.startDate} - ${resultObj.endDate}`;
      historyResults.appendChild(resultElement);

      link.onclick = () => {
        resultsInit(
          resultObj.city,
          resultObj.startDate,
          resultObj.endDate,
          resultObj.location
        );
      };
    });
  } else {
    const noResults = document.createElement("div");
    noResults.innerHTML = `<h3>No search history results found!</h3>`;
    historyResults.appendChild(noResults);
  }
};
