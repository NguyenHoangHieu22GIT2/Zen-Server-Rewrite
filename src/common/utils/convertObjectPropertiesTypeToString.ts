export function ConvertObjectPropertiesTypeToString<T extends object>(
  objectToConvert: object,
): T {
  const convertedObject = {} as T;
  for (const key in objectToConvert) {
    const propertyInObjectToConvert = objectToConvert[key];
    // If Date, then convert to Unix time then Stringify it
    if (propertyInObjectToConvert instanceof Date)
      convertedObject[key] = propertyInObjectToConvert.getTime().toString();
    else convertedObject[key] = objectToConvert[key].toString();
  }
  return convertedObject;
}
