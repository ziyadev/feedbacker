import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty } from 'class-validator';

@InputType()
export class SendEmailResetPasswordLinkDto {
  @Field()
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
