import { PartialType } from '@nestjs/swagger';
import { CreateGroupMemberRequestDto } from './create-group-member-request.dto';

export class UpdateGroupMemberRequestDto extends PartialType(CreateGroupMemberRequestDto) {}
