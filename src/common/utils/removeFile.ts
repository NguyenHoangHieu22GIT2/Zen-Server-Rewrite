import { unlink } from 'fs';
import { createPathImage } from './createPathImage';
export function deleteFile(fileName: string) {
  return unlink(createPathImage(fileName), () => {});
}
