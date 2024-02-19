import { Mixin } from 'ts-mixer';
import { FindGroupPostDto } from './find-group-post.dto';
import { CreateGroupPostDto } from './create-group-post.dto';

export class ModifyGroupPostDto extends Mixin(
  CreateGroupPostDto,
  FindGroupPostDto,
) {}
