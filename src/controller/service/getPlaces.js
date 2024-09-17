import { API_KEY_FOURSQUARE } from "../../../api-keys.js";
import {
  API_SINGLE_PLACE_URL,
  API_SEARCH_PLACES_URL,
} from "../../constants.js";
import { renderError } from "../../view/components/renderError.js";
import { fetchData } from "./fetchData.js";

export const getPlaces = async (location, category) => {
  const headers = {
    headers: {
      Authorization: API_KEY_FOURSQUARE,
    },
  };

  const { latitude, longitude } = JSON.parse(location);
  const coordinates = `${latitude},${longitude}`;
  try {
    const data = await fetchData(
      `${API_SEARCH_PLACES_URL}${coordinates}`.replace(
        "select_category",
        category
      ),
      headers
    );
    const ids = data.results.map((value) => value.fsq_id);

    const placePromises = ids.map(async (id) => {
      try {
        const dataPlace = await fetchData(
          API_SINGLE_PLACE_URL.replace("place_id", id),
          headers
        );
        console.log(dataPlace);
        const name = dataPlace.name;
        const description = dataPlace.description;
        let image;
        if (dataPlace.photos[0]) {
          image =
            dataPlace.photos[0].prefix +
            "original" +
            dataPlace.photos[0].suffix;
        } else {
          image = "";
        }

        return [name, description, image];
      } catch (error) {
        renderError("Error fetch data for ", id, error);
        throw error;
      }
    });
    return Promise.all(placePromises);
  } catch (error) {
    renderError("Error in getPlaces: ", error);
    throw error;
  }
};
