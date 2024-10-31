import axios from "axios";

const myAxiosInstance = axios.create({
  baseURL: "https://orecipesapi.onrender.com/api/",
});

export const addTokenToAxiosInstance = (token: string) => {
  myAxiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const removeTokenFromInstance = () => {
  myAxiosInstance.defaults.headers.common.Authorization = "";
};

export default myAxiosInstance;
