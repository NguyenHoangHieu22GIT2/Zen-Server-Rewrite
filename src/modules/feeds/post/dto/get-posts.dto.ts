import { QueryLimitSkip } from 'src/cores/global-dtos/query-limit-skip.dto';
import { FindByIdEndUserDto } from 'src/modules/users/enduser/dto/find-one.dto';
import { Mixin } from 'ts-mixer';

export class getPostsDto extends Mixin(QueryLimitSkip, FindByIdEndUserDto) {}
