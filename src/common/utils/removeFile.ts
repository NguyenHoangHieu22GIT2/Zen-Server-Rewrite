import { unlink } from 'fs';
import createPathImage from './createPathImage';
export default function removeFile(fileName: string) {
  return unlink(createPathImage(fileName), () => {});
}
