import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';
export class ForgotPasswordDto {
  @ApiProperty({
    title: "End user's Email",
    type: String,
    required: true,
    example: 'hoanghieufro@gmail.com',
  })
  @IsEmail({ domain_specific_validation: true })
  email: string;
}
