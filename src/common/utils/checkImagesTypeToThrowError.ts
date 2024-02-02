import { checkImageTypeToThrowError } from './checkImageTypeToThrowError';

export function checkImagesTypeToThrowError(files: Express.Multer.File[]) {
  files.forEach((file) => {
    checkImageTypeToThrowError(file);
  });
  return true;
}
