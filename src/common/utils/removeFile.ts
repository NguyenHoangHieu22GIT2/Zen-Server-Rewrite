import { unlink } from 'fs';
import { createPathImage } from './createPathImage';
export function removeFile(fileName: string) {
  return unlink(createPathImage(fileName), () => {});
}
