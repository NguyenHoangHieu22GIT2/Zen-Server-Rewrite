import { Transform } from 'class-transformer';
import { IsDate, IsOptional, IsString } from 'class-validator';
import { FindEventDto } from './find-event.dto';

export class ModifyEventDto extends FindEventDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsDate()
  @Transform((opts) => {
    return new Date(opts.value);
  })
  @IsOptional()
  startAt: Date;

  @IsDate()
  @Transform((opts) => {
    return new Date(opts.value);
  })
  @IsOptional()
  endAt: Date;
}
