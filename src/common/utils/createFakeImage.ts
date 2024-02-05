import { faker } from '@faker-js/faker';
import { readFileSync } from 'fs';
import { join } from 'path';

export function createFakeImage(): Express.Multer.File {
  const fileBuffer = readFileSync(
    join(__dirname, '../../../assets/image1.jpg'),
  );
  const image: Partial<Express.Multer.File> = {
    originalname: faker.person.firstName('male'),
    mimetype: 'image/jpeg',
    buffer: fileBuffer,
  };
  return image as any;
}
