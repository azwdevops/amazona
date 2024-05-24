import { getCartItems } from "./localStorage";

export const parseRequestUrl = () => {
  const url = document.location.hash.toLowerCase();
  const request = url.split("/");

  return {
    resource: request[1],
    id: request[2],
    action: request[3],
  };
};

export const rerender = async (component) => {
  document.getElementById("main-container").innerHTML = await component.render();
  await component.afterRender();
};

export const showLoading = () => {
  document.getElementById("loading-overlay").classList.add("active");
};
export const hideLoading = () => {
  document.getElementById("loading-overlay").classList.remove("active");
};

export const showMessage = (message, callback) => {
  const messageOverlay = document.getElementById("message-overlay");
  messageOverlay.innerHTML = `
    <div>
      <div id="message-overlay-content">${message}</div>
      <button id="message-overlay-close-button">OK</button>
    </div>
  `;
  messageOverlay.classList.add("active");
  document.getElementById("message-overlay-close-button").addEventListener("click", () => {
    messageOverlay.classList.remove("active");
    if (callback) {
      callback();
    }
  });
};

export const redirectUser = () => {
  if (getCartItems().length !== 0) {
    document.location.hash = "/shipping";
  } else {
    document.location.hash = "/";
  }
};
