import { createImageName } from './createImageName';

export default function createImageObjectsToSave(
  images: Express.Multer.File[],
) {
  const imageNames = [];
  const createdImageObjects = images.map((image) => {
    const imageName = createImageName(image.originalname);
    imageNames.push(imageName);
    // file and fileName property because storeFile function demands it
    return { file: image, fileName: imageName };
  });
  return { createdImageObjects, imageNames };
}
