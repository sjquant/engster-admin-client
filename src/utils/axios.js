import axios from "axios";
import cookies from "axios/lib/helpers/cookies";
import qs from "qs";

const axiosObj = axios.create({
  baseURL: process.env.BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  withCredentials: true,
  paramsSerializer: params => qs.stringify(params, { indices: false }),
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
  setCSRFHeader() {
    const accessCSRF = cookies.read("X-CSRF-Token");
    const refreshCSRF = cookies.read("X-RCSRF-Token");
    axiosObj.defaults.headers.common["X-CSRF-Token"] = accessCSRF;
    axiosObj.defaults.headers.common["X-RCSRF-Token"] = refreshCSRF;
  },
};
