# Travel Advisor

## Live demo

[https://aleksandrvasilyev.github.io/travel-advisor/](https://aleksandrvasilyev.github.io/travel-advisor/)

## Overview

Travel Advisor is a web application that allows users to search for attractions and places in a selected city based on specific dates. It helps users plan their trips by offering recommendations for things to do in a city at a particular time.

## Features

- Search for places and attractions in a city
- Filter results by categories and date ranges
- Integration with Foursquare API for places and attractions
- Integration with JamBase API for events happening in the selected city

## Technologies Used

- **HTML**: For structuring the web pages
- **CSS**: For styling the UI
- **JavaScript**: For dynamic interactions and API calls
- **FOURSQUARE API**: For fetching details of attractions and points of interest
- **JamBase API**: For fetching event data happening in the selected city

## Installation

To run the project locally:

1. Clone the repository:

   ```bash
   git clone https://github.com/aleksandrvasilyev/travel-advisor.git
   ```

2. Create a new file api-keys.js in the root of the project and add your API keys for Foursquare and JamBase:

   ```javascript
    // api-keys.js
    export const API_KEY_FOURSQUARE = "YOUR_API_KEY_FOURSQUARE";
    export const API_KEY_JAMBASE = "YOUR_API_KEY_JAMBASE";
   ```

3. Open index.html in your browser

## Usage

1. Select a city and enter the date range for your trip.
2. Choose categories of interest (e.g., landmarks, arts, restaurants).
3. View the list of places and events happening in the city during your specified dates.
4. Take a look and discover information the specific place.

## Screenshots

### Index Page

![Screenshot_index](./screenshots/index.png?raw=true)

### Results Page

![Screenshot_results](./screenshots/results.png?raw=true)

### History Page

![Screenshot_history](./screenshots/history.png?raw=true)

## Structure of the project

```.
├── README.md
├── api-keys.js
├── index.html
├── public
│   ├── fonts
│   │   └── ParafinaTrial-BoldL.otf
│   ├── images
│   │   ├── favicon.ico
│   │   ├── loading.gif
│   │   ├── logo.png
│   │   └── star.svg
│   └── styles
│       └── styles.css
└── src
    ├── app.js
    ├── constants.js
    ├── controller
    │   ├── historyPage.js
    │   ├── indexPage.js
    │   ├── resultsPage.js
    │   └── service
    │       ├── executeSearch.js
    │       ├── fetchData.js
    │       ├── getEvents.js
    │       ├── getPlaces.js
    │       ├── inputCityAutocomplete.js
    │       ├── router.js
    │       └── searchHistory.js
    └── view
        ├── components
        │   ├── renderError.js
        │   └── renderSearchHints.js
        ├── renderHistoryPage.js
        ├── renderIndexPage.js
        ├── renderResultsPage.js
        └── renderTemplate.js
```
