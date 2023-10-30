import { User } from '../interface/User';
import { Authapi, api } from './core';

export const signup = async (userData: User) => {
  const response = await api.post('register', userData);
  return response;
};

export const signin = async (userid: string, password: string) => {
  const response = await api.post('login', { userid, password });
  return response;
};

export const signout = async () => {
  const response = await Authapi.get('unregister');
  return response;
};
