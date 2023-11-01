import axios from 'axios';
import { getLocalStorageToken } from '../utils/LocalStorage';

export const LOCAL_URL = 'http://localhost:5000/python/';
export const SERVER_URL = `${process.env.REACT_APP_PORT_FORWARD_IP}/python/`;
//axios instance
const instance = (url: string) => {
  return axios.create({
    baseURL: url,
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

const Authinstacne = (url: string) => {
  return axios.create({
    baseURL: url,
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};
export const api = instance(LOCAL_URL);
export const Authapi = Authinstacne(LOCAL_URL);

Authapi.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${getLocalStorageToken()}`;
  return config;
});
