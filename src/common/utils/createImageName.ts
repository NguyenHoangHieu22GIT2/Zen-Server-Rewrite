import { v4 } from 'uuid';

export function createImageNames(imageOriginalNames: string[]) {
  const imageNames: string[] = [];
  imageOriginalNames.forEach((imageOriginalName) => {
    const createdImageName = createImageName(imageOriginalName);
    imageNames.push(createdImageName);
  });
  return imageNames;
}

export function createImageName(imageOriginalName: string) {
  return v4() + ' ' + imageOriginalName;
}
