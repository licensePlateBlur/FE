export const getLocalStorageToken = () => {
  return localStorage.getItem('acess_token');
};
export const setLocalStorageToken = (acess_token: string) => {
  localStorage.setItem('acess_token', acess_token);
};
