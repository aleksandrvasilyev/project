import { API_KEY_JAM_BASE } from "../../../api-keys.js";
import { API_EVENTS_URL } from "../../constants.js";
import { renderError } from "../../view/components/renderError.js";
import { renderElement, renderEvent } from "../../view/renderResult.js";
import { fetchData } from "./fetchData.js";

export const getEvents = async (latitude, longitude, startDate, endDate) => {
  try {
    const data = await fetchData(
      API_EVENTS_URL.replace("latitude_value", latitude)
        .replace("longitude_value", longitude)
        .replace("start_date", startDate)
        .replace("end_date", endDate)
        .replace("api_key_value", API_KEY_JAM_BASE)
    );
    data.events.forEach((element) => {
      //   console.log(element);

      renderEvent(
        element.name,
        element["@type"],
        element.startDate,
        element.location.name,
        element.image,
        "events"
      );
    });
  } catch (error) {
    renderError(error.message);
    throw new Error(error.message);
  }
};
