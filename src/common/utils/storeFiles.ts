import { storeFile } from './storeFile';

type Parameters = {
  file: Express.Multer.File;
  fileName: string;
};

export function storeFiles(parameters: Parameters[]) {
  parameters.forEach(({ file, fileName }) => {
    storeFile({ file, fileName });
  });
}
