import { BadRequestException } from '@nestjs/common';

export default function checkImagesTypeToThrowErrors(
  files: Express.Multer.File[],
) {
  files.forEach((file) => {
    checkImageTypeToThrowErrors(file);
  });
  return true;
}

export function checkImageTypeToThrowErrors(
  file: Express.Multer.File,
): file is Express.Multer.File {
  if (
    file.mimetype !== 'image/jpeg' &&
    file.mimetype !== 'image/png' &&
    file.mimetype !== 'image/jpg'
  ) {
    throw new BadRequestException('Wrong Image Type');
  }
  return true;
}
