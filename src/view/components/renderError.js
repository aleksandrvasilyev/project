export const renderError = (message) => {
  const errorBlock = document.createElement("div");
  errorBlock.id = "error";
  document.body.appendChild(errorBlock);
  errorBlock.innerHTML = `<div>Error: ${message}</div>`;
  setTimeout(() => {
    if (errorBlock) errorBlock.remove();
  }, 3000);
  throw new Error(message);
};
