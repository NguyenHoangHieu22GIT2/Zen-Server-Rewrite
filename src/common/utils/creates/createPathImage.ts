import { join } from 'path';

export function createPathImage(fileName: string): string {
  return join(process.cwd(), `/src/uploads/${fileName}`);
}
