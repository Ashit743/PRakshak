import axios from "axios";
const api = axios.create({
  baseURL: "https://ominous-capybara-vwrp4xqj6g5hvrv-5000.app.github.dev",
});
export const mlapi = axios.create({
  baseURL: "https://ominous-capybara-vwrp4xqj6g5hvrv-5050.app.github.dev",
});
export default api;
