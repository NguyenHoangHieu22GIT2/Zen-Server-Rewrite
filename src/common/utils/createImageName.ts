import { v4 } from 'uuid';

export function createImageName(imageOriginalName: string) {
  return v4() + ' ' + imageOriginalName;
}
