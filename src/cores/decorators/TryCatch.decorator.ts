import { HttpException, InternalServerErrorException } from '@nestjs/common';
import { ClassMethodsDecorator } from './ClassMethods.Decorator';

export const TryCatchDecorator = ClassMethodsDecorator(
  async (originalMethod, args) => {
    try {
      const result = await originalMethod.apply(this, args);
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
  },
);
