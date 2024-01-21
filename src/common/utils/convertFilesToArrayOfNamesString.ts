export function ConvertFilesToArrayOfFileNamesString(
  files: Express.Multer.File[],
) {
  const fileNames: string[] = [];

  files.forEach((file) => {
    const fileName = file.originalname;
    fileNames.push(fileName);
  });

  return fileNames;
}
