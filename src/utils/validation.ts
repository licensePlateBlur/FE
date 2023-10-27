export const checkEmail = (email: string) => {
  return email.includes('@');
};

export const checkPassword = (password: string) => {
  return password.length >= 8 ? true : false;
};
