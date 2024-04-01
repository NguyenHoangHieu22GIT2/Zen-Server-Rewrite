import { HttpException, InternalServerErrorException } from '@nestjs/common';
import { ClassMethodsDecorator } from './ClassMethods.Decorator';

export const TryCatchDecorator = ClassMethodsDecorator(
  async function (_this, originalMethod, args) {
    try {
      const result = await originalMethod.apply(_this, args);
      return result;
    } catch (error: unknown) {
      console.log('-----------------------------');
      console.log(error);
      console.log('-----------------------------');
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
