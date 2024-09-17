import { SELECT_CATEGORY } from "../constants.js";
import { getEvents } from "../controller/service/getEvents.js";
import { renderError } from "./components/renderError.js";
import { renderTemplate } from "./renderTemplate.js";
let values = {};
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
              <div class="form-group">
                    <h2><label for="category">Category</label></h2>
                   <select id="category" class="select-category">
                    <option value="16000">Landmarks and Outdoors</option>
                    <option value="10000">Arts and Entertainment</option>
                    <option value="13000">Dining and Drinking</option>
                    <option value="18000">Sports and Recreation</option>
                    <option value="19000">Travel and Transportation</option>
                    <option value="15000">Health and Medicine</option>
                   </select>
                </div>
                <button type="submit" class="button" id="search-button">Search</button>
            </form>
        </div>
    </main>
    <div class="container heading">
        <h1>Popular <span id="category-value"></span> places in ${city}</h1>
        <div id="places-pcs"></div>
    </div>
    <div class="container results" id="places"></div>

    <div class="container heading">
        <div><h1>Popular events in ${city}</h1><h3>${startDate} to ${endDate}</h3></div>
        <div id="events-pcs"></div>
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
    values.places = value;
    const countShowElements = 12;

    const elementsPresent = document.querySelectorAll("#places .result").length;
    const placesNumber = document.getElementById("places-pcs");

    placesNumber.innerHTML = `<span>${
      elementsPresent + countShowElements
    }</span> of <span id="places-max">48</span> pcs.`;

    const places = await value;

    await places
      .slice(elementsPresent, countShowElements + elementsPresent)
      .map((place) => renderPlace(...place));

    renderShowMorePlaces();
  } catch (error) {
    renderError(error);
    throw error;
  }
};

export const renderEvents = async (value, eventsMax = 0) => {
  try {
    const countShowElements = value.length;
    const eventsElement = document.getElementById("events");

    if (countShowElements === 0) {
      const emptyResponse = document.createElement("div");
      emptyResponse.textContent = `Nothing was found!`;
      eventsElement.appendChild(emptyResponse);
    }
    const elementsPresent = document.querySelectorAll("#events .result").length;

    const eventsNumber = document.getElementById("events-pcs");
    eventsNumber.innerHTML = `<div>${
      elementsPresent + countShowElements
    } of <span id="events-max">${eventsMax}</span> pcs.</div>`;

    const events = value;

    events.forEach((event) => {
      renderEvent(...event);
    });
    renderShowMoreEvents();
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

const renderShowMorePlaces = () => {
  const results = document.getElementById("places");
  const button = document.createElement("div");
  const elementsPresent = document.querySelectorAll(`#places .result`).length;

  if (elementsPresent < 48) {
    results.appendChild(button);
    button.innerHTML = `<div class="show-more">Show more</div>`;
    button.onclick = async () => {
      renderLoading("places", "show");
      button.remove();
      await renderPlaces(values.places);
      renderLoading("places", "hide");
    };
  }
};

const renderShowMoreEvents = () => {
  const results = document.getElementById("events");
  const button = document.createElement("div");
  const elementsPresent = document.querySelectorAll(`#events .result`).length;
  const maxEvents = document.getElementById("events-max").textContent;

  if (elementsPresent < maxEvents) {
    results.appendChild(button);
    button.innerHTML = `<div class="show-more">Show more</div>`;
    button.onclick = async () => {
      renderLoading("events", "show");
      button.remove();

      const location = JSON.parse(
        document.getElementById("trip-city").getAttribute("data-location")
      );

      const latitude = location.latitude;
      const longitude = location.longitude;
      const startDate = document.getElementById("trip-start").value;
      const endDate = document.getElementById("trip-end").value;

      const { events, totalItems } = await getEvents(
        latitude,
        longitude,
        startDate,
        endDate,
        elementsPresent / 8 + 1
      );

      await renderEvents(events, totalItems);
      renderLoading("events", "hide");
    };
  }
};

export const setCategoryValue = (category) => {
  const categorySelect = document.getElementById(SELECT_CATEGORY);
  categorySelect.value = category;
  const categoryValue =
    categorySelect.options[categorySelect.selectedIndex].text;
  const categoryValueElement = document.getElementById("category-value");
  categoryValueElement.textContent = categoryValue;
};
