import axios from "axios";

export const instance = axios.create({
  baseURL: "",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    grant_type: "password",
    lang: "en",
    client_id: "backoffice",
    token_type: "bearer",
  },
  timeout: 60000,
});

export const setToken = (token: string) => {
  if (token) {
    instance.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    instance.defaults.headers.common.Authorization = "";
  }
};

export function getToken() {
  return instance.defaults.headers.common.Authorization;
}

export function setURL(url: string) {
  instance.defaults.baseURL = url;
}

export function getURL() {
  return instance?.defaults?.baseURL;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getUrl(config: any) {
  if (config?.baseURL) {
    return config?.url?.replace(config?.baseURL, "");
  }

  return config?.url;
}

// Intercept all responses
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log("Axios Err IResponse:", error);

    return Promise.reject(error);
  },
);
