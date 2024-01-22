import { Request } from 'express';
import { userMinimalType } from '../objectTypes/user-minimal.type';
import { ObjectToHashType } from '../redisTypes/ObjectToHash.redis.type';

export type RequestUser = Request & { user: userMinimalType };
