import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class ChangeInformationDto {
  @ApiProperty({
    title: "User's username to change to",
    type: String,
    examples: ['Mikey', 'Anne', 'Elizabeth'],
    required: false,
  })
  @IsString()
  @IsOptional()
  username: string;

  @ApiProperty({
    title: "User's Gender to change to",
    type: String,
    examples: ['male', 'female', 'other'],
    required: false,
  })
  @IsString()
  @IsOptional()
  gender: string;

  @ApiProperty({
    title: "User's description to change to",
    type: String,
    example: 'This is just a description',
    required: false,
  })
  @IsString()
  @IsOptional()
  description: string;
}
