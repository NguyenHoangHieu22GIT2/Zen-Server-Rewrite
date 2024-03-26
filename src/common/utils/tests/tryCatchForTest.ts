import { HttpException, InternalServerErrorException } from '@nestjs/common';

export async function tryCatchForTest(fn: any) {
  try {
    await fn();
  } catch (error) {
    console.log(error.message);
    if (
      error instanceof HttpException &&
      !(error instanceof InternalServerErrorException)
    ) {
      expect(error).toBeDefined();
    } else {
      throw new InternalServerErrorException('This is bad');
    }
  }
}
