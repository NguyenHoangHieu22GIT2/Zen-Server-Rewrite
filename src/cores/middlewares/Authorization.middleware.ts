import { Injectable, NestMiddleware } from '@nestjs/common';
import { EndUserId } from 'src/common/types/utilTypes/Brand';
import { RequestUser } from 'src/common/types/utilTypes/RequestUser';
import { checkToConvertToMongoIdOrThrowError } from 'src/common/utils/';

@Injectable()
export class AuthorizationMiddleware implements NestMiddleware {
  use(req: RequestUser, _res: any, next: (error?: any) => void) {
    if (req.user && req.user._id) {
      req.user._id = checkToConvertToMongoIdOrThrowError<EndUserId>({
        id: req.user._id,
        returnError: true,
      });
    }
    next();
  }
}
