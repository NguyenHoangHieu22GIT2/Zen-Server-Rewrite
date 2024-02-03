import { Request } from 'express';
import { userMinimalType } from '../objectTypes/user-minimal.type';

export type RequestUser = Request & { user: userMinimalType };
