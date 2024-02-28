import { Transform } from 'class-transformer';
import { IsDate, IsString } from 'class-validator';

export class CreateEventDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsDate()
  @Transform((opts) => {
    return new Date(opts.value);
  })
  startAt: Date;

  @IsDate()
  @Transform((opts) => {
    return new Date(opts.value);
  })
  endAt: Date;
}
