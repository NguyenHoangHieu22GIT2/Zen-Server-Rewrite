import mongoose, { PipelineStage, Types } from 'mongoose';
import { DocumentMongodbType } from '../types/mongodbTypes';
import { ObjectToHashType } from '../types/redisTypes';
import { isMongoId } from 'class-validator';
import { EndUserId } from '../types/utilTypes';
import { BadRequestException } from '@nestjs/common';
import { RedisClient } from 'src/cores/redis';

const emptyObj = {};

const noop = () => {};

const noObj = {};

function isArray<T>(value: any): value is T[] {
  return Array.isArray(value);
}

function isObject<T>(value: any): value is T {
  return value !== null && typeof value === 'object';
}

function convertToBooleanBasedOnStringMeaning(value: string) {
  return value === 'true' ? true : false;
}

function checkingToConvertToObjectFromDocument<T extends object>(
  entity: T | DocumentMongodbType<T>,
): T {
  if ('toObject' in entity) {
    return entity.toObject();
  }
  return entity;
}

function ConvertFilesToArrayOfFileNamesString(files: Express.Multer.File[]) {
  const fileNames: string[] = [];

  files.forEach((file) => {
    const fileName = file.originalname;
    fileNames.push(fileName);
  });

  return fileNames;
}

function ConvertObjectToHash<T extends object>(
  objectToConvert: T,
): ObjectToHashType<T> {
  const convertedObject = {} as ObjectToHashType<T>;
  for (const key in objectToConvert) {
    const propertyInObjectToConvert = objectToConvert[key];

    // If Date, then convert to Unix time then turn it into string
    if (propertyInObjectToConvert instanceof Date)
      convertedObject[key] = propertyInObjectToConvert.getTime().toString();
    else if (isMongodbId(propertyInObjectToConvert.toString()))
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

function isUndefined(value: unknown): value is undefined {
  return typeof value === 'undefined';
}

function isNullOrUndefined(value: unknown): value is null {
  return value == null || typeof value == 'undefined';
}

function isImageTheRightType(
  file: Express.Multer.File,
): file is Express.Multer.File {
  if (
    file.mimetype !== 'image/jpeg' &&
    file.mimetype !== 'image/png' &&
    file.mimetype !== 'image/jpg'
  ) {
    return false;
  }
  return true;
}

function isImagesTheRightType(files: Express.Multer.File[]) {
  files.forEach((file) => {
    isImageTheRightType(file);
  });
  return true;
}

function isIdsEqual(id1: Types.ObjectId, id2: Types.ObjectId) {
  return id1.toString() === id2.toString();
}

function isMongodbId(id: unknown): id is Types.ObjectId {
  return isMongoId(id);
}

function checkToConvertToMongoIdOrThrowError<TType>({
  id,
  returnError,
}: {
  id: string | EndUserId;
  returnError: boolean;
}) {
  if (id.toString().length == 24 || Types.ObjectId.isValid(id)) {
    return new mongoose.Types.ObjectId(id) as TType;
  } else if (returnError) {
    throw new BadRequestException('Wrong Id Type');
  }
  return null;
}

function ExecuteIfRedisAvailable<T>(fn: () => Promise<T>): Promise<T> {
  if (RedisClient.isOpen) return fn();
}

function PopulateSkipAndLimit({
  limit,
  skip,
}: {
  skip: number;
  limit: number;
}): PipelineStage[] {
  return [
    {
      $skip: skip,
    },
    { $limit: limit },
  ];
}

function isRedisResultEmpty(value: Record<any, any>): boolean {
  return Object.keys(value).length == 0;
}

function decorateAndConcatName(target: string[]) {
  let stringResult = '';
  target.forEach((string, index) => {
    if (index == 3) {
      stringResult += 'and ' + string;
      if (target.length > 3) {
        stringResult += 'and ...';
      }
    } else stringResult += string + ', ';
  });
  return stringResult;
}

// TODO: finish this if this makes sense, right now it is not!
// function concatString(object: Record<string, any>[], property: string): string;
// function concatString(arr: string[]): string;
// function concatString(
//   target: Record<string, any>[] | string[],
//   property?: string,
// ): string {
//   if (isArray<string>(target)) {
//     return decorateAndConcatName(target);
//   } else {

//   }
// }

export {
  isArray,
  isObject,
  noop,
  noObj,
  emptyObj,
  convertToBooleanBasedOnStringMeaning,
  checkingToConvertToObjectFromDocument,
  ConvertObjectToHash,
  ConvertFilesToArrayOfFileNamesString,
  isUndefined,
  isNullOrUndefined,
  isImageTheRightType,
  isImagesTheRightType,
  isIdsEqual,
  isMongodbId,
  checkToConvertToMongoIdOrThrowError,
  ExecuteIfRedisAvailable,
  PopulateSkipAndLimit,
  isRedisResultEmpty,
  decorateAndConcatName,
};
