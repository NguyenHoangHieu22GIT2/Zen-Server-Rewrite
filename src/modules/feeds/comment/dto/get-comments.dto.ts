import { QueryLimitSkip } from 'src/cores/global-dtos/query-limit-skip.dto';
import { Mixin } from 'ts-mixer';
import { FindPostDto } from '../../post/dto/find-post.dto';

export class GetCommentsDto extends Mixin(QueryLimitSkip, FindPostDto) {}
