// --- Libraries ---
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  IsStrongPassword,
  MinLength,
} from 'class-validator';
// --- Local ---
import { OTHER, gender } from 'src/constants/enduser';

export class CreateEnduserDto {
  @ApiProperty({
    title: 'Username of the user',
    type: String,
    required: true,
    pattern: 'username should have more than 5 characters',
    example: 'mikey',
  })
  @IsString()
  @MinLength(5)
  username: string;

  @ApiProperty({
    title: 'Password of the User',
    type: String,
    required: true,
    pattern:
      'Contains lowercase and uppercase letter, a number and a symbol (special character). at leasst 8 characters',
    example: 'AVeryStr@ngPassword123',
  })
  @IsStrongPassword()
  @MinLength(8)
  password: string;

  @ApiProperty({
    title: 'Email of the User',
    type: String,
    required: true,
  })
  @IsEmail()
  email: string;

  // @ApiProperty({
  //   title: 'Avatar of the user',
  //   type: String,
  //   required: true,
  //   pattern: 'the name of the avatar',
  //   example: 'picture-of-mike.png',
  // })
  // @IsString()
  // avatar: string;

  @ApiProperty({
    title: 'Gender of the user',
    type: String,
    required: true,
    default: OTHER,
    pattern: 'MALE OR FEMALE OR OTHER',
    example: 'male',
  })
  @IsString()
  gender: gender;
}
