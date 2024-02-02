import { v4 } from 'uuid';

export default function createImageName(imageOriginalName: string) {
  return v4() + ' ' + imageOriginalName;
}
