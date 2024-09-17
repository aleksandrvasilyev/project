import {
  CATEGORY_VALUE,
  END_DATE,
  EVENTS_ELEMENT,
  HIDE,
  MODAL_ELEMENT,
  PLACES_ELEMENT,
  RESULT_ELEMENT,
  SEARCH_CITY_ELEMENT,
  SELECT_CATEGORY,
  SHOW,
  SHOW_PLACES_COUNT,
  START_DATE,
} from "../constants.js";
import { getEvents } from "../controller/service/getEvents.js";
import { renderError } from "./components/renderError.js";
import { setSearchValue } from "./components/renderSearchHints.js";
import { renderTemplate } from "./renderTemplate.js";
let values = {};
export const renderResultPage = async (
  city,
  startDate,
  endDate,
  location,
  category
) => {
  const [startYear, startMonth, startDay] = startDate.split("-");
  const [endYear, endMonth, endDay] = endDate.split("-");

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
        <div><h1>Popular events in ${city}</h1><h3>${startDay}-${startMonth}-${startYear} to ${endDay}-${endMonth}-${endYear}</h3></div>
        <div id="events-pcs"></div>
    </div>
    <div class="container results" id="events"></div>
    
    <div id="modal">
        <div class="modal-content">
            <div class="information"></div>
            <span class="close" id="close">X</span>
        </div>
    </div>
`;
  renderTemplate(resultContent);
  setSearchValue(document.getElementById(SEARCH_CITY_ELEMENT), city, location);

  renderLoading(PLACES_ELEMENT, SHOW);
  renderLoading(EVENTS_ELEMENT, SHOW);

  setCategoryValue(category);
};

const showSinglePlace2 = (placeElement, place) => {
  const modal = document.getElementById(MODAL_ELEMENT);
  try {
    placeElement.onclick = () => {
      modal.style.display = "block";
      const modalContent = document.querySelector(
        ".modal-content .information"
      );
      modalContent.innerHTML = `<div class="main-information">
                    <div class="name">${place.name}</div>
                    <div class="table">
                    ${
                      place.rating
                        ? `<div class="row">
                            <div class="label">Rating:</div>
                            <div class="value"><img src="././public/images/star.svg" alt="star" class="star"> ${place.rating}</div>
                        </div>`
                        : ""
                    }
                        
                        <div class="row">
                            <div class="label">Category:</div>
                            <div class="value">${
                              place.categories ? place.categories[0].name : ""
                            }</div>
                        </div>
                        <div class="row">
                            <div class="label">Address:</div>
                            <div class="value">${
                              place.location
                                ? place.location.formatted_address
                                : ""
                            }</div>
                        </div>
                        ${
                          place.description
                            ? ` <div class="row">
                            <div class="label">Description:</div>
                            <div class="value">${place.description}</div>
                        </div>`
                            : ""
                        }
                       ${
                         place.hours.display
                           ? `  <div class="row">
                            <div class="label">Hours:</div>
                            <div class="value">${place.hours.display}</div>
                        </div>`
                           : ""
                       }
                      
                        <div class="row">
                            <div class="label">Status:</div>
                            <div class="value status ${
                              place.hours.open_now ? "open" : "closed"
                            }">${place.hours.open_now ? "open" : "closed"}</div>
                        </div>
                    </div>
                </div>
                ${
                  place.photos && place.photos.length >= 1
                    ? `<div class="gallery">
                    ${
                      place.photos[0]
                        ? `<img src="${place.photos[0].prefix}original${place.photos[0].suffix}" alt="photo-1">`
                        : ""
                    }
                    ${
                      place.photos[1]
                        ? `<img src="${place.photos[1].prefix}original${place.photos[1].suffix}" alt="photo-2">`
                        : ""
                    }
                    ${
                      place.photos[2]
                        ? `<img src="${place.photos[2].prefix}original${place.photos[2].suffix}" alt="photo-3">`
                        : ""
                    }
                    ${
                      place.photos[3]
                        ? `<img src="${place.photos[3].prefix}original${place.photos[3].suffix}" alt="photo-4">`
                        : ""
                    }
                </div>`
                    : ""
                }
                `;
    };
  } catch (error) {
    renderError(error);
  }
  document.getElementById("close").onclick = () => {
    modal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
};

export const renderPlace = async (name, description = "", image, rating) => {
  const results = document.getElementById(PLACES_ELEMENT);
  const place = document.createElement("div");
  place.classList.add(RESULT_ELEMENT);
  place.style.backgroundImage = `url('${image}')`;

  place.innerHTML = `
        ${
          rating !== undefined
            ? `<div class="rating"><img src="././public/images/star.svg" alt="star" class="star"><span>${rating}</span></div>`
            : ""
        }
        <div class="content">
            <div class="title">${name}</div>
            <div class="description">${description}</div>
        </div>
        `;

  results.appendChild(place);
  return place;
};

export const renderEvent = async (name, type, startDate, location, image) => {
  const results = document.getElementById(EVENTS_ELEMENT);
  const place = document.createElement("div");
  place.classList.add(RESULT_ELEMENT);
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

    const elementsPresent = document.querySelectorAll(
      `#${PLACES_ELEMENT} .${RESULT_ELEMENT}`
    ).length;
    const placesNumber = document.getElementById("places-pcs");

    placesNumber.innerHTML = `<span>${
      elementsPresent + countShowElements
    }</span> of <span id="places-max">${SHOW_PLACES_COUNT}</span> pcs.`;

    const places = await value;

    await places
      .slice(elementsPresent, countShowElements + elementsPresent)
      .map(async (place) => {
        let image;

        if (place.photos[0]) {
          image = place.photos[0].prefix + "original" + place.photos[0].suffix;
        } else {
          image = "";
        }

        const placeElement = await renderPlace(
          place.name,
          place.description,
          image,
          place.rating
        );
        showSinglePlace2(placeElement, place);
      });

    renderShowMorePlaces();
  } catch (error) {
    renderError(error);
    throw error;
  }
};

export const renderEvents = async (value, eventsMax = 0) => {
  try {
    const countShowElements = value.length;
    const eventsElement = document.getElementById(EVENTS_ELEMENT);

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
  const results = document.getElementById(PLACES_ELEMENT);
  const button = document.createElement("div");
  const elementsPresent = document.querySelectorAll(`#places .result`).length;

  if (elementsPresent < SHOW_PLACES_COUNT) {
    results.appendChild(button);
    button.innerHTML = `<div class="show-more">Show more</div>`;
    button.onclick = async () => {
      renderLoading(PLACES_ELEMENT, SHOW);
      button.remove();
      await renderPlaces(values.places);
      renderLoading(PLACES_ELEMENT, HIDE);
    };
  }
};

const renderShowMoreEvents = () => {
  const results = document.getElementById(EVENTS_ELEMENT);
  const button = document.createElement("div");
  const elementsPresent = document.querySelectorAll(`#events .result`).length;
  const maxEvents = document.getElementById("events-max").textContent;

  if (elementsPresent < maxEvents) {
    results.appendChild(button);
    button.innerHTML = `<div class="show-more">Show more</div>`;
    button.onclick = async () => {
      renderLoading(EVENTS_ELEMENT, SHOW);
      button.remove();

      const location = JSON.parse(
        document
          .getElementById(SEARCH_CITY_ELEMENT)
          .getAttribute("data-location")
      );

      const latitude = location.latitude;
      const longitude = location.longitude;
      const startDate = document.getElementById(START_DATE).value;
      const endDate = document.getElementById(END_DATE).value;

      const { events, totalItems } = await getEvents(
        latitude,
        longitude,
        startDate,
        endDate,
        elementsPresent / 8 + 1
      );

      await renderEvents(events, totalItems);
      renderLoading(EVENTS_ELEMENT, HIDE);
    };
  }
};

export const setCategoryValue = (category) => {
  const categorySelect = document.getElementById(SELECT_CATEGORY);
  categorySelect.value = category;
  const categoryValue =
    categorySelect.options[categorySelect.selectedIndex].text;
  const categoryValueElement = document.getElementById(CATEGORY_VALUE);
  categoryValueElement.textContent = categoryValue;
};
