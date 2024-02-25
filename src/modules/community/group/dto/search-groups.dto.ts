import { IsString } from 'class-validator';
import { QueryLimitSkip } from 'src/cores/global-dtos';

export class SearchGroupsDto extends QueryLimitSkip {
  @IsString()
  name: string;
}
