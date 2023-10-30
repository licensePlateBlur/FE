import { Authapi } from './core';

export const videoupload = async (formdata: FormData) => {
  const response = await Authapi.post('detect_video', formdata);
  return response;
};

export const previewvideo = async (id: number) => {
  const response = await Authapi.get(`video/${id}`, { responseType: 'blob' });
  return response;
};
