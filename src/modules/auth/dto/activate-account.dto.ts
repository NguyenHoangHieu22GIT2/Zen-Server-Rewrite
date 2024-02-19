import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ActivateAccountDto {
  @ApiProperty({
    title: 'Token to activate the account',
    type: String,
    required: true,
  })
  @IsString()
  activationToken: string;
}
