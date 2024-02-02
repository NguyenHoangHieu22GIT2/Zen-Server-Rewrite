import { DocumentMongodbType } from '../types/mongodbTypes/DocumentMongodbType';

export function checkingToConvertToObjectFromDocument<T extends object>(
  entity: T | DocumentMongodbType<T>,
): T {
  if ('toObject' in entity) {
    return entity.toObject();
  }
  return entity;
}
