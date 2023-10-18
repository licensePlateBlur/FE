import axios from 'axios';

export const LOCAL_URL = 'http://localhost:5000/python/';
export const SERVER_URL = 'http://13.125.245.232:5000/python/';
//axios instance
const instance = (url: string) => {
  return axios.create({
    baseURL: url,
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const api = instance(SERVER_URL);
