import { IsString } from 'class-validator';

export class FindFriendsByName {
  @IsString()
  username: string;
}
