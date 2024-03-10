import axios from "axios";
const api = axios.create({
  baseURL: "https://prakshak.onrender.com",
});
export const mlapi = axios.create({
  baseURL: "https://fantastic-space-fortnight-76q6gjxqj6gfg9v-5050.app.github.dev",
});
export default api;
