import { createImageName } from './createImageName';

export function createImageNames(imageOriginalNames: string[]) {
  const imageNames: string[] = [];
  imageOriginalNames.forEach((imageOriginalName) => {
    const createdImageName = createImageName(imageOriginalName);
    imageNames.push(createdImageName);
  });
  return imageNames;
}
