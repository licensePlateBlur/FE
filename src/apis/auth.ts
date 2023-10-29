import { User } from '../interface/User';
import { api } from './core';

export const signup = async (userData: User) => {
  const response = await api.post('register', userData);
  return response;
};

export const signin = async (userid: string, password: string) => {
  const response = await api.post('login', { userid, password });
  return response;
};
