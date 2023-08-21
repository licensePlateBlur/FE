import { api } from './core';

export const videoupload = async (formdata: FormData) => {
  const response = await api.post('detect_video', formdata);
  return response;
};

export const previewvideo = async (id: number) => {
  const response = await api.get(`video/${id}`, { responseType: 'blob' });
  return response;
};
