import axios from "axios";
import cookies from "axios/lib/helpers/cookies";

const axiosObj = axios.create({
  baseURL: process.env.BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default {
  axiosObj,
  get(path, options = {}) {
    return axiosObj.get(`${path}`, options);
  },
  post(path, data, options = {}) {
    return axiosObj.post(`${path}`, data, options);
  },
  delete(path, data = {}, options = {}) {
    return axiosObj.delete(`${path}`, { data: data, ...options });
  },
  put(path, data, options = {}) {
    return axiosObj.put(`${path}`, data, options);
  },
  setCSRFHeader({ accessCSRF, refreshCSRF }) {
    accessCSRF = accessCSRF || cookies.read("X-CSRF-Token");
    refreshCSRF = refreshCSRF || cookies.read("X-RCSRF-Token");
    axiosObj.defaults.headers.common["X-CSRF-Token"] = accessCSRF
      ? accessCSRF
      : null;
    axiosObj.defaults.headers.common["X-RCSRF-Token"] = refreshCSRF
      ? refreshCSRF
      : null;
  },
};
