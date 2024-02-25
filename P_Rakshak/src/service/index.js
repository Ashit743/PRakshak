import axios from "axios";
const api = axios.create({
  baseURL: "http://127.0.0.1:5000",
});
export const mlapi = axios.create({
  baseURL: "https://ominous-capybara-vwrp4xqj6g5hvrv-5050.app.github.dev",
});
export default api;
