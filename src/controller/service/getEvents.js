import { API_KEY_JAM_BASE } from "../../../api-keys.js";
import { API_EVENTS_URL } from "../../constants.js";
import { renderError } from "../../view/components/renderError.js";
import { fetchData } from "./fetchData.js";

export const getEvents = async (
  latitude,
  longitude,
  startDate,
  endDate,
  page = 1
) => {
  try {
    const data = await fetchData(
      API_EVENTS_URL.replace("latitude_value", latitude)
        .replace("longitude_value", longitude)
        .replace("start_date", startDate)
        .replace("end_date", endDate)
        .replace("api_key_value", API_KEY_JAM_BASE)
        .replace("page_number", page)
    );

    const events = data.events.map((el) => {
      return [el.name, el["@type"], el.startDate, el.location.name, el.image];
    });

    return {
      events,
      totalItems: data.pagination.totalItems,
    };
  } catch (error) {
    renderError(error.message);
    throw new Error(error.message);
  }
};
