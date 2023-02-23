import App from "./app";

let _APP: App | null = null;

window.addEventListener('DOMContentLoaded', () => {
  _APP = new App();
});
