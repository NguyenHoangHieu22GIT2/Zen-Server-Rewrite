import { IsNumber, IsString, Min } from 'class-validator';

export class CreateSubscriptionDto {
  @IsString()
  name: string;

  @Min(1)
  @IsNumber()
  price: number;

  @IsString()
  description: string;
}
