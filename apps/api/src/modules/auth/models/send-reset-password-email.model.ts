import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';

export enum SendResetPasswordEmailErrorCode {
  MAX_RESET_ATTEMPTS_EXCEEDED = 'MAX_RESET_ATTEMPTS_EXCEEDED',
  EMAIL_NOT_FOUND = 'EMAIL_NOT_FOUND',
}
registerEnumType(SendResetPasswordEmailErrorCode, {
  name: 'SendResetPasswordEmailErrorCode',
});

@ObjectType()
export class SendResetPasswordEmailError {
  @Field(() => SendResetPasswordEmailErrorCode)
  code: SendResetPasswordEmailErrorCode;

  @Field(() => String)
  message: string;
}

@ObjectType()
export class SendResetPasswordEmailModel {
  @Field(() => Boolean, { nullable: true, description: 'Success flag' })
  success: boolean;
  @Field(() => [SendResetPasswordEmailError], {
    nullable: true,
  })
  errors: SendResetPasswordEmailError[];
}
