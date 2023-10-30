import { Authapi  } from './core';

export const realtimeshooting = async () => {
  const response = await Authapi.post('detect_realtime');
  return response;
};

export const previewvideo = async (id: number) => {
  const response = await Authapi.get(`video/${id}`, { responseType: 'blob' });
  return response;
};
