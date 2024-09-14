import { APP_ID } from "../constants.js";

export const renderTemplate = (content) => {
  const app = document.getElementById(APP_ID);
  app.innerHTML = `
 <header>
        <div class="container">
            <div class="logo">
                <a href="/">
                    <img src="./public/images/logo.png" alt="logo">
                </a>
            </div>
            <div class="nav">
                <a href="#" class="active nav__link">Home</a><a href="#" class="nav__link">About us</a>
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
