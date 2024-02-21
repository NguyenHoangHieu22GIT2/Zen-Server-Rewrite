import { HttpException, InternalServerErrorException } from '@nestjs/common';

/**
 *@param {Function} fn - () => any
 * This function is used for codes that need try catch in Nest.JS
 * Enviroment, so it will catch error and throw error based
 * on what kind of error it is (Purely instance of HttpException), or if it's an error coming from codes
 * then it will be the default one (Internal Server Error)
 * */
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
