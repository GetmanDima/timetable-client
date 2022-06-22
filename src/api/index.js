import {API_URL, NODE_ENV} from "@env";
import axios from "axios";
import Constants from "expo-constants";
const {manifest} = Constants;

const devApiUrl = `http://${manifest.debuggerHost.split(":").shift()}:5000/api`;
const apiUrl = NODE_ENV === "production" ? API_URL : devApiUrl;

console.log(apiUrl);

export const getHost = () => {
  return axios.create({
    baseURL: apiUrl,
  });
};

export const getAuthHost = accessToken => {
  const $authHost = axios.create({
    baseURL: apiUrl,
  });

  const authInterceptor = config => {
    config.headers.authorization = `Bearer ${accessToken}`;
    return config;
  };

  $authHost.interceptors.request.use(authInterceptor);

  return $authHost;
};
