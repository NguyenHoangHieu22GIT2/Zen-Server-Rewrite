import { IsString } from 'class-validator';
import { QueryLimitSkip } from 'src/cores/global-dtos';

export class SearchPostsDto extends QueryLimitSkip {
  @IsString()
  searchKeyWords: string;
}
