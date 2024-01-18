import { BadRequestException } from '@nestjs/common';

export function checkImageType(
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
