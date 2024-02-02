import { unlink, writeFile } from 'fs';
import { createPathImage } from './createPathImage';

type Parameters = {
  file: Express.Multer.File;
  fileName: string;
};

export function storeFile({ file, fileName }: Parameters) {
  writeFile(createPathImage(fileName), file.buffer, (error) => {
    if (error) unlink(createPathImage(fileName), () => {});
  });
}
