import axios from "axios";
import { setupCache } from "axios-cache-interceptor";
import { FDate } from "../FDate";
import { API_DOMAIN } from "./constants";

export const instance = axios.create({
  baseURL: `${API_DOMAIN}api/v1/tours`,
  timeout: 1000,
  headers: {
    Accept: "",
  },
});

export const clientApi = setupCache(instance, {
  ttl: FDate.toMilliseconds("1m"),
});
