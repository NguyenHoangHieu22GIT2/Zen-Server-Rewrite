import { Transform } from 'class-transformer';
import { IsDefined } from 'class-validator';
import { Types } from 'mongoose';
import { convertToMongoId } from 'src/common/utils/convertToMongodbId';

export class FindByIdEndUserDto {
  @IsDefined({ message: 'Wrong Id format in mongodb' })
  @Transform((opts) => {
    return convertToMongoId(opts.value);
  })
  id: Types.ObjectId;
}
