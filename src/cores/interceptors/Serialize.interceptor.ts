import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { plainToInstance } from 'class-transformer';

export function SerializeDecorator(serializeDto: any) {
  return UseInterceptors(new SerializeInterceptor(serializeDto));
}

@Injectable()
export class SerializeInterceptor implements NestInterceptor {
  constructor(private readonly serializeDto: any) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const result = plainToInstance(this.serializeDto, data, {
          excludeExtraneousValues: true,
        });
        return result;
      }),
    );
  }
}
