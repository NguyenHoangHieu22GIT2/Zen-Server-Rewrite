import { ObjectToHashType } from '../../types/redisTypes/ObjectToHash.redis.type';
import { isMongoId } from 'class-validator';

// THIS FUNCTION NOW IS ALREADY IN USED (CAN BE CHANGED IF WE USE A NEW TYPE FOR OUR ENTITY)
// IT WILL REPLACE THE WHOLE SERIALIZE FOLDER IN (src/cores/redis-serialize)
export function ConvertObjectToHash<T extends object>(
  objectToConvert: T,
): ObjectToHashType<T> {
  const convertedObject = {} as ObjectToHashType<T>;
  for (const key in objectToConvert) {
    const propertyInObjectToConvert = objectToConvert[key];

    // If Date, then convert to Unix time then turn it into string
    if (propertyInObjectToConvert instanceof Date)
      convertedObject[key] = propertyInObjectToConvert.getTime().toString();
    else if (isMongoId(propertyInObjectToConvert.toString()))
      convertedObject[key] = propertyInObjectToConvert.toString();
    else if (
      propertyInObjectToConvert instanceof Array ||
      propertyInObjectToConvert instanceof Object
    ) {
      convertedObject[key] = JSON.stringify(propertyInObjectToConvert);
    } else {
      convertedObject[key] = propertyInObjectToConvert.toString();
    }
  }
  return convertedObject;
}
