import { randomBytes } from 'crypto';

export const nanoid = (size: number): string => {
  const alphabet =
    '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const bytes = randomBytes(size);
  let id = '';

  for (let i = 0; i < size; i++) {
    id += alphabet[bytes[i] % alphabet.length];
  }

  return id;
};
