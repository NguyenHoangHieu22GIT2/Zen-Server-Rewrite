import { ObjectToHashType } from '../types/redisTypes/ObjectToHash.redis.type';

export function ConvertObjectToHash<T extends Object>(
  objectToConvert: object,
): ObjectToHashType<T> {
  const convertedObject = {} as ObjectToHashType<T>;
  for (const key in objectToConvert) {
    const propertyInObjectToConvert = objectToConvert[key];
    // If Date, then convert to Unix time then Stringify it
    if (propertyInObjectToConvert instanceof Date)
      convertedObject[key] = propertyInObjectToConvert.getTime().toString();
    else convertedObject[key] = objectToConvert[key].toString();
  }
  return convertedObject;
}
