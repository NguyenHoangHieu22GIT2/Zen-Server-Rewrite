import { StringifyProperties } from '../types/utilTypes/StringifyProperties';

/**
 * A function to convert all properties's type of an object to string.
 * @param objectToConvert is any object
 * @example obj {age:20} => obj{age:"20"}
 * */
export function ConvertObjectPropertiesTypeToString<T extends object>(
  objectToConvert: object,
): StringifyProperties<Partial<T>> {
  const convertedObject: Partial<StringifyProperties<T>> = {};
  for (const key in objectToConvert) {
    const propertyInObjectToConvert = objectToConvert[key];
    // If Date, then convert to Unix time then Stringify it
    if (propertyInObjectToConvert instanceof Date)
      convertedObject[key] = propertyInObjectToConvert.getTime().toString();
    else convertedObject[key] = objectToConvert[key].toString();
  }
  return convertedObject;
}
