export const getLocalStorage = () => {
  return localStorage.getItem('username');
};
export const setLocalStorage = (username: string) => {
  localStorage.setItem('username', username);
};
