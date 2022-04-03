import {API_URL} from "@env";
import axios from "axios";

export const getHost = () => {
  return axios.create({
    baseURL: API_URL,
  });
};

export const getAuthHost = accessToken => {
  const $authHost = axios.create({
    baseURL: API_URL,
  });

  const authInterceptor = config => {
    config.headers.authorization = `Bearer ${accessToken}`;
    return config;
  };

  $authHost.interceptors.request.use(authInterceptor);

  return $authHost;
};
