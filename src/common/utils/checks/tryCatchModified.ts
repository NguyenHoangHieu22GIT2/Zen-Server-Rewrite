import { HttpException, InternalServerErrorException } from '@nestjs/common';

/**
 * @param {Function} fn
 * This function is used for codes that need try catch in Nest.JS
 * Enviroment, so it will catch error and throw error based
 * on what kind of error it is (Purely instance of HttpException), or if it's an error coming from codes
 * then it will be the default one (Internal Server Error)
 * @deprecated
 * */
export async function tryCatchModified<T>(fn: () => Promise<T>) {
  try {
    const result = await fn();
    return result;
  } catch (error: unknown) {
    if (error instanceof HttpException) {
      const HttpExceptionError = error as HttpException;
      throw HttpExceptionError;
    } else {
      const serverError = error as Error;
      throw new InternalServerErrorException(serverError.message);
    }
  }
}
