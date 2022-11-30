/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { store } from "../app/store";

const inst = axios.create({
  baseURL: "https://budget-server.aldairgc.com",
});

inst.interceptors.request.use(
  (config: any) => {
    const token = store.getState().auth.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }
);

inst.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    console.log("AXIOS ERROR: response", error);
    return Promise.reject(error);
  }
);

export default inst;
