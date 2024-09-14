import { renderTemplate } from "./renderTemplate.js";

export const renderResult = async (city, startDate, endDate) => {
  const resultContent = `
  <!-- results start -->
    <main class="container result-search">

        <div class="search-form-small">
            <form>
                <div class="form-group">
                    <h2><label for="trip-city">Destination</label></h2>
                    <input type="text" id="trip-city" placeholder="Enter city" value="${city}">
                    <div id="city-hints" class="hints">
                   <!--     <div class="hint-item">One</div>
                        <div class="hint-item">Two</div>
                        <div class="hint-item">Three</div>
                        <div class="hint-item">Four</div> -->
                    </div>
                </div>
                <div class="form-group">
                    <h2><label for="trip-start">Start Date</label></h2>
                    <input type="date" id="trip-start" value="${startDate}" min="2024-09-20" max="2024-12-31">
                </div>
                <div class="form-group">
                    <h2><label for="trip-end">End Date</label></h2>
                    <input type="date" id="trip-end" value="${endDate}" min="2024-09-20" max="2024-12-31">
                </div>
                <button type="submit" class="button" id="search-button">Search</button>
            </form>
        </div>
    </main>
    <div class="container heading">
        <h1>The most popular sights in ${city}</h1>
    </div>
    <div class="container results"></div>
    <!-- results end -->
`;
  renderTemplate(resultContent);
};

export const showPlace = async (name, description, image) => {
  const results = document.querySelector(".container.results");
  const place = document.createElement("div");
  place.classList.add("result");
  place.style.backgroundImage = `url('${image}')`;

  place.innerHTML = `
        <div class="content">
            <div class="title">${name}</div>
            <div class="description">${description}</div>
        </div>
        `;

  results.appendChild(place);
};
