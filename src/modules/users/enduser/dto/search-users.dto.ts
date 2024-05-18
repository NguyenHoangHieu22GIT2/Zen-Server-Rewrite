import { IsOptional, IsString } from 'class-validator';
import { QueryLimitSkip } from 'src/cores/global-dtos';

export class SearchUsersDto extends QueryLimitSkip {
  @IsString()
  @IsOptional()
  search: string;
}
