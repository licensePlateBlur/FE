import { api } from './core';

export const photoupload = async (formdata: FormData) => {
  const response = await api.post('detect_image', formdata);
  return response;
};

export const canvassave = async (formdata: FormData) => {
  const response = await api.post('image_upload', formdata);
  return response;
};
