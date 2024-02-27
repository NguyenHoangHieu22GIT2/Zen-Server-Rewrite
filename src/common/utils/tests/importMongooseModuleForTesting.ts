import { Schema } from 'mongoose';
import { DB_NAME_TEST, DB_URL } from '../../constants/env-development';
import { MongooseModule } from '@nestjs/mongoose';

export function importMongooseModuleForTesting(
  name: string,
  schema: Schema<any>,
) {
  return [
    MongooseModule.forRoot(DB_URL, {
      dbName: DB_NAME_TEST,
    }),
    MongooseModule.forFeature([{ name: name, schema: schema }]),
  ];
}
