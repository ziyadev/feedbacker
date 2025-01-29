import { Field, InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';

@InputType()
export class CredentialsSignUpDto {
  @Field()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  name: string;
  @Field()
  @IsEmail()
  email: string;
  @Field()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minSymbols: 1,
  })
  password: string;
}
