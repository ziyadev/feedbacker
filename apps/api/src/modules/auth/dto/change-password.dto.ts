import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsStrongPassword } from 'class-validator';

@InputType()
export class ChangePasswordDto {
  @Field()
  @IsString()
  token: string;

  @Field()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
  })
  newPassword: string;
}
