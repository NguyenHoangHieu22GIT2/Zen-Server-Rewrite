import { PartialType } from '@nestjs/swagger';
import { CreateEnduserDto } from './create-end-user.dto';

export class UpdateAuthDto extends PartialType(CreateEnduserDto) {}
