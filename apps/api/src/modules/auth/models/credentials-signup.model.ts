import { UserModel } from '@/modules/user/models/user.model';
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';

export enum CredentialsSignUpErrorCode {
  USER_EXISTS = 'USER_EXISTS',
}
registerEnumType(CredentialsSignUpErrorCode, {
  name: 'CredentialsSignUpErrorCode',
});

@ObjectType()
export class CredentialsSignUpError {
  @Field(() => CredentialsSignUpErrorCode)
  code: CredentialsSignUpErrorCode;

  @Field(() => String)
  message: string;
}

@ObjectType()
export class CredentialsSignUpModel {
  @Field(() => UserModel, { nullable: true, description: 'User' })
  user: UserModel;
  @Field(() => [CredentialsSignUpError], {
    nullable: true,
    description: 'Credentials SignUp error',
  })
  errors: CredentialsSignUpError[];
}
