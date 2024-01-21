import { Mixin } from 'ts-mixer';
import { CreatePostDto } from './create-post.dto';
import { FindPostDto } from './find-post.dto';

export class ModifyPostDto extends Mixin(CreatePostDto, FindPostDto) {}
