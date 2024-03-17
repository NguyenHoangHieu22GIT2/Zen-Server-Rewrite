import { isImageTheRightType } from './isImageTheRightType';

export function isImagesTheRightType(files: Express.Multer.File[]) {
  files.forEach((file) => {
    isImageTheRightType(file);
  });
  return true;
}
