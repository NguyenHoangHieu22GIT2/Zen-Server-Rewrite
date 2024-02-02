import { join } from 'path';

export default function createPathImage(fileName: string): string {
  return join(process.cwd(), `/src/uploads/${fileName}`);
}
