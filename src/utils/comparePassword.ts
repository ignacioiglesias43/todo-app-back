import * as bcrypt from 'bcrypt';

export const comparePassword = (password: string, passwordCrypt: string) =>
  bcrypt.compare(password, passwordCrypt);
