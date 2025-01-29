import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CheckResetPasswordTokenDto {
  @Field()
  @IsString()
  token: string;
}
