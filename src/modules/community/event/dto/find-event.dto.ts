import { Transform } from 'class-transformer';
import { IsString } from 'class-validator';
import { EventId } from 'src/common/types/utilTypes';
import { checkToConvertToMongoIdOrThrowError } from 'src/common/utils';

export class FindEventDto {
  @IsString()
  @Transform((opts) =>
    checkToConvertToMongoIdOrThrowError({ id: opts.value, returnError: true }),
  )
  eventId: EventId;
}
