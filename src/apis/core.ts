import axios from 'axios'

export const BASE_URL = 'http://localhost:5000/python/';

//axios instance
const instance = (url: string) => {
    return axios.create({
      baseURL: url,
      headers: { "Content-Type": "multipart/form-data" },
    });
  };

  export const api = instance(BASE_URL);