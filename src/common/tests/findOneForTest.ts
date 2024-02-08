import { DocumentMongodbType } from '../types/mongodbTypes/DocumentMongodbType';
import { nameOfCollections } from '../constants/name-of-collections';
import { connect } from 'mongoose';
import { DB_NAME_TEST, DB_URL } from '../constants/env-development';

export async function FindOneForTest<T>(
  collectionName: (typeof nameOfCollections)[keyof typeof nameOfCollections],
): Promise<DocumentMongodbType<T>> {
  const mongod = await connect(DB_URL, {
    dbName: DB_NAME_TEST,
  });
  return mongod.connection.db.collection(collectionName).findOne() as any;
}
