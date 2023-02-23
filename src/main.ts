import DemoApp from "./demo-app";

let _APP: DemoApp | null = null;

window.addEventListener('DOMContentLoaded', () => {
  _APP = new DemoApp();
});
