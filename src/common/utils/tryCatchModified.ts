import { HttpException, InternalServerErrorException } from '@nestjs/common';

export function tryCatchModified<T>(fn: () => T) {
  try {
    return fn();
  } catch (error) {
    if (error instanceof HttpException) {
      throw error;
    } else {
      throw new InternalServerErrorException(error);
    }
  }
}
