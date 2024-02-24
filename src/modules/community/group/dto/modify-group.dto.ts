import { GroupId } from 'src/common/types/utilTypes';
import { CreateGroupDto } from './create-group.dto';
import { IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { checkToConvertToMongoIdOrThrowError } from 'src/common/utils';

export class ModifyGroupDto extends CreateGroupDto {
  @IsString()
  @Transform((opts) =>
    checkToConvertToMongoIdOrThrowError({ id: opts.value, returnError: true }),
  )
  groupId: GroupId;
}
