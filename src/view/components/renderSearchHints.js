import { DATA_LOCATION, HINTS_ELEMENT, HINT_ELEMENT } from "../../constants.js";

export const renderHints = (data) => {
  const hints = document.getElementById(HINTS_ELEMENT);
  hints.innerHTML = "";

  data.results.forEach((element) => {
    const hintElement = document.createElement("div");
    hintElement.classList.add(HINT_ELEMENT);
    hintElement.textContent = element.geo.name;
    hintElement.setAttribute(DATA_LOCATION, JSON.stringify(element.geo.center));
    hints.appendChild(hintElement);
  });
};

export const clearHints = () => {
  const hints = document.getElementById(HINTS_ELEMENT);
  hints.innerHTML = "";
};

export const toggleHintsVisibility = (focusElement, toggleElement) => {
  focusElement.onfocus = () => {
    toggleElement.style.display = "block";
  };

  focusElement.onblur = () => {
    setTimeout(() => {
      toggleElement.style.display = "none";
    }, 100);
  };
};

export const setSearchValue = (element, value, location) => {
  element.value = value;
  element.setAttribute(DATA_LOCATION, location);
};
