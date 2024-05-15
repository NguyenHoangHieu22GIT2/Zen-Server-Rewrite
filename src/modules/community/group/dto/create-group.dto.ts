import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsString } from 'class-validator';
import { convertToBooleanBasedOnStringMeaning } from 'src/common/utils';

export class CreateGroupDto {
  @IsString()
  @ApiProperty({
    title: 'Name of the group',
    type: String,
    example: 'LeagueOfLinux',
  })
  name: string;

  // @IsString()
  // @ApiProperty({
  //   title: 'avatar of the group',
  //   type: String,
  //   example: 'alskdjalsdjlasjdlasjd',
  // })
  // avatar: string;

  @IsBoolean()
  @Transform((opts) => convertToBooleanBasedOnStringMeaning(opts.value))
  @ApiProperty({
    title: "group's visibility",
    type: Boolean,
    example: true,
  })
  isVisible: boolean;

  @IsString()
  @ApiProperty({
    title: "group's description",
    type: String,
    example:
      'Welcome to league of Linux, where we show you the way to play league on linux',
  })
  description: string;
}
