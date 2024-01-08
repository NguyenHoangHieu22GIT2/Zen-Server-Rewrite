import { PartialType } from '@nestjs/mapped-types';
import { CreateEnduserDto } from './create-enduser.dto';

export class UpdateEnduserDto extends PartialType(CreateEnduserDto) {}
