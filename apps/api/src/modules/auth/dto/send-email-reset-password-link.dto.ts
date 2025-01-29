import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty } from 'class-validator';

@InputType()
export class SendEmailResetPasswordLinkDto {
  @Field(() => String, { description: 'Email address' })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
