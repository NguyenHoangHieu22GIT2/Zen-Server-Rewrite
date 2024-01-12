import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  IsStrongPassword,
  MinLength,
} from 'class-validator';
import { OTHER, gender } from 'src/common/constants/enduser';

export class RegisterEndUserDto {
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
    example: 'hoanghieufro@gmail.com',
  })
  @IsEmail()
  email: string;

  // Let's see If we can send File through this. I am certain (70%) that we can not do that. in any case, let's just put it here
  // @ApiProperty({
  //   title: 'Avatar of the user',
  //   type: ,
  //   required: true,
  //   pattern: 'the name of the avatar',
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
