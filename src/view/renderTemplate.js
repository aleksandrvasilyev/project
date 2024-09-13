export const renderTemplate = (content) => {
  const app = document.getElementById("app");
  app.innerHTML = `
 
    <header class="container">
        <div class="menu">
            <div class="logo">
              <a href="#" class="logo__link">Travel advisor</a>
            </div>
            <div class="nav">
              <a href="#" class="nav__link">Home</a>
              <a href="#" class="nav__link">About us</a>
            </div>
        </div>
    </header>
 
 
  <main class="container">${content}</main>
  <footer class="container">
      <p>Footer</p>
  </footer>
`;
};
