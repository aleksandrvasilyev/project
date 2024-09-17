import { HOME_LINK } from "../constants.js";
import { renderTemplate } from "./renderTemplate.js";

export const renderIndex = () => {
  const indexContent = `
    <main class="container">
        <div class="hero">
            <h1>Plan Your Travel Worldwide</h1>
            <p>Choose your destination and date to discover the top attractions and exciting events happening in the
                city. Plan your perfect trip with ease!</p>
        </div>
        <div class="search-form">
            <form>
                <div class="form-group">
                    <h2><label for="trip-city">Destination</label></h2>
                    <input type="text" id="trip-city" placeholder="Enter city">
                    <div id="city-hints" class="hints"></div> 
                </div>
                <div class="form-group">
                    <h2><label for="trip-start">Start Date</label></h2>
                    <input type="date" id="trip-start" value="2024-09-25" min="2024-09-20" max="2024-12-31">
                </div>
                <div class="form-group">
                    <h2><label for="trip-end">End Date</label></h2>
                    <input type="date" id="trip-end" value="2024-09-30" min="2024-09-20" max="2024-12-31">
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
`;
  renderTemplate(indexContent);
  document.getElementById(HOME_LINK).classList.add("active");
};
