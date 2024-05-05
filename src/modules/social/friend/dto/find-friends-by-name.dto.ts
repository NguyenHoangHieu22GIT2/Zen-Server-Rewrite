import { IsString } from 'class-validator';
import { QueryLimitSkip } from 'src/cores/global-dtos';

export class FindFriendsByName extends QueryLimitSkip {
  @IsString()
  username: string;
}
