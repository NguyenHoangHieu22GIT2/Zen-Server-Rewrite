import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsStrongPassword } from 'class-validator';

export class ChangeForgottonPasswordDto {
  @ApiProperty({
    title: 'new password for the account',
    type: String,
    required: true,
    example: 'SonGoku@1',
  })
  @IsStrongPassword()
  password: string;

  @ApiProperty({
    title: 'Modify Token to have the permission to change password',
    type: String,
    required: true,
  })
  @IsString()
  modifyToken: string;
}
