import { api } from './core';

export const getfiles = async (page: number) => {
  const response = await api.get(`files?page=${page}`);
  return response;
};

export const downloadfile = async (id: number) => {
  const response = await api.get(`download_file/${id}`);
  return response;
};

export const deletefile = async (id: number) => {
  const response = await api.get(`delete/${id}`);
  return response;
};

export const getfile = async (id: number) => {
  const response = await api.get(`file/${id}`);
  return response;
};
