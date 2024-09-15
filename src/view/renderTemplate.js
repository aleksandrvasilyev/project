import { APP_ID } from "../constants.js";

export const renderTemplate = (content) => {
  const app = document.getElementById(APP_ID);
  app.innerHTML = `
 <header>
        <div class="container">
            <div class="logo">
                <a href="#" class="home-link">
                    <img src="./public/images/logo.png" alt="logo">
                </a>
            </div>
            <div class="nav">
                <a href="#" id="home-link" class="nav__link home-link">Home</a><a href="#" id="history-link" class="nav__link">History</a>
            </div>
        </div>
    </header>
      ${content}
     <footer>
        <div class="container">
            &copy; 2024 Travel advisor
        </div>
    </footer>
`;
};
