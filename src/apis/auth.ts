import { User } from '../interface/User';
import { Authapi } from './core';

export const signup = async (userData: User) => {
  const response = await Authapi.post('register', userData);
  return response;
};

export const login = async (userid: string, password: string) => {
  const response = await Authapi.post('login', { userid, password });
  return response;
};
