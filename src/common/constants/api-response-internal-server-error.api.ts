import { ApiResponse } from '@nestjs/swagger';

export const apiResponseInternalServerError = ApiResponse({
  status: 500,
  description: 'Server not responsed',
});
