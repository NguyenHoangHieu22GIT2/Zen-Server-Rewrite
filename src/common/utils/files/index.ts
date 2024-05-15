import { faker } from '@faker-js/faker';
import { readFileSync, unlink, writeFile } from 'fs';
import { join } from 'path';
import { v4 } from 'uuid';

export function createFakeImage(): Express.Multer.File {
  const fileBuffer = readFileSync(
    join(__dirname, '../../../assets/image1.jpg'),
  );
  const image: Partial<Express.Multer.File> = {
    originalname: faker.person.firstName('male') + '.jpeg',
    mimetype: 'image/jpeg',
    buffer: fileBuffer,
  };
  return image as any;
}

export function createImageName(imageOriginalName: string) {
  return v4() + ' ' + imageOriginalName;
}

export function createImageObjectsToSave(images: Express.Multer.File[]) {
  const imageNames = [];
  const createdImageObjects = images.map((image) => {
    const imageName = createImageName(image.originalname);
    imageNames.push(imageName);
    // file and fileName property because storeFile function demands it
    return { file: image, fileName: imageName };
  });
  return { createdImageObjects, imageNames };
}

export function createPathImage(fileName: string): string {
  return join(process.cwd(), `/src/uploads/${fileName}`);
}

export async function removeFile(fileName: string) {
  return unlink(createPathImage(fileName), () => {});
}

type Parameters = {
  file: Express.Multer.File;
  fileName: string;
};

export async function storeFile({ file, fileName }: Parameters) {
  writeFile(createPathImage(fileName), file.buffer, (error) => {
    if (error) {
      unlink(createPathImage(fileName), () => {});
      console.log('storfile error', error);
    }
  });
}

export async function storeFiles(parameters: Parameters[]) {
  parameters.forEach(({ file, fileName }) => {
    storeFile({ file, fileName });
  });
}
