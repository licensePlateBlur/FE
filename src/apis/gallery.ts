import { Authapi } from './core';

export const getfiles = async (page: number) => {
  const response = await Authapi.get(`files?page=${page}`);
  return response;
};

export const downloadfile = async (id: number) => {
  const response = await Authapi.get(`download_file/${id}`,{ responseType: 'blob' });
  return response;
};

export const deletefile = async (id: number) => {
  const response = await Authapi.get(`delete/${id}`);
  return response;
};

export const getfile = async (id: number) => {
  const response = await Authapi.get(`file/${id}`);
  return response;
};
