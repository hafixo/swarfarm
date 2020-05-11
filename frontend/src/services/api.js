import { setup } from "axios-cache-adapter";

const apiRoot =
  process.env.NODE_ENV === "development"
    ? "http://127.0.0.1:8000/api/v2"
    : "https://swarfarm.com/api/v2";

const api = setup({
  baseURL: apiRoot,
  withCredentials: true,
  cache: {
    maxAge: 15 * 60 * 1000,
    exclude: {
      query: false,
      filter: config => config.url.startsWith("/profiles"),
    },
  },
});

if (process.env.NODE_ENV === "development") {
  api.interceptors.response.use(
    function(response) {
      const params = response.config.params
        ? Object.keys(response.config.params)
            .map(key => `${key}=${response.config.params[key]}`)
            .join(",")
        : "";
      const cache_hit = response.request.fromCache ? "cache-hit" : "cache-miss";
      console.debug(
        `API ${cache_hit}: ${response.config.url}${params ? "?" : ""}${params}`
      );
      return response;
    },
    function(error) {
      console.debug(error);
      return Promise.reject(error);
    }
  );
}

export default api;
