import checkImageTypeToThrowErrors from './checkImageTypeToThrowError';

export default function checkImagesTypeToThrowError(
  files: Express.Multer.File[],
) {
  files.forEach((file) => {
    checkImageTypeToThrowErrors(file);
  });
  return true;
}
