import { join } from 'path';

export const createPathImage = (fileName: string): string => {
  return join(process.cwd(), `/src/uploads/${fileName}`);
};
