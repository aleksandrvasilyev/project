import { renderError } from "./components/renderError.js";
import { renderTemplate } from "./renderTemplate.js";

export const renderResultPage = async (city, startDate, endDate) => {
  const resultContent = `
    <main class="container result-search">

        <div class="search-form-small">
            <form>
                <div class="form-group">
                    <h2><label for="trip-city">Destination</label></h2>
                    <input type="text" id="trip-city" placeholder="Enter city" value="${city}">
                    <div id="city-hints" class="hints"></div>
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
    <div class="container results" id="places"></div>

    <div class="container heading">
        <h1>Popular events in ${city} from ${startDate} to ${endDate}</h1>
    </div>
    <div class="container results" id="events"></div>
`;
  renderTemplate(resultContent);
};

export const renderPlace = async (name, description = "", image) => {
  const results = document.getElementById("places");
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

export const renderEvent = async (name, type, startDate, location, image) => {
  const results = document.getElementById("events");
  const place = document.createElement("div");
  place.classList.add("result");
  place.style.backgroundImage = `url('${image}')`;

  place.innerHTML = `
        <div class="content">
            <div class="title">${name}</div>
            <div class="type">${type}</div>
            <div class="date">${startDate.replace("T", " - ")}</div>
            <div class="location">${location}</div>
        </div>
        `;

  results.appendChild(place);
};

export const renderPlaces = async (value) => {
  try {
    const places = await value;
    places.map((place) => renderPlace(place[0], place[1], place[2]));
  } catch (error) {
    renderError(error);
    throw error;
  }
};

export const renderEvents = async (value) => {
  try {
    const events = await value;
    events.forEach((event) => {
      renderEvent(event[0], event[1], event[2], event[3], event[4]);
    });
  } catch (error) {
    renderError(error);
    throw error;
  }
};

export const renderLoading = (container, action) => {
  if (action === "show") {
    const loadingElement = document.createElement("div");
    loadingElement.id = `${container}-loading`;
    const containerElement = document.getElementById(container);
    containerElement.appendChild(loadingElement);
    loadingElement.innerHTML = `<img src="././public/images/loading.gif" alt="loading">`;
  } else if (action === "hide") {
    const loadingElement = document.getElementById(`${container}-loading`);
    loadingElement.remove();
  }
};
