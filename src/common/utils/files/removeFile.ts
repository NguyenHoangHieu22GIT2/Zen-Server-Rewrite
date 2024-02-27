import { unlink } from 'fs';
import { createPathImage } from '../creates/createPathImage';
export function removeFile(fileName: string) {
  return unlink(createPathImage(fileName), () => {});
}
