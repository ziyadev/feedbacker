import { UserModel } from '@/modules/user/models/user.model';
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';

export enum CredentialsLoginErrorCode {
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
}
registerEnumType(CredentialsLoginErrorCode, {
  name: 'CredentialsLoginErrorCode',
});

@ObjectType()
export class CredentialsLoginError {
  @Field(() => CredentialsLoginErrorCode)
  code: CredentialsLoginErrorCode;

  @Field(() => String)
  message: string;
}

@ObjectType()
export class CredentialsLoginModel {
  @Field(() => UserModel, { nullable: true, description: 'User' })
  user: UserModel;
  @Field(() => [CredentialsLoginError], {
    nullable: true,
    description: 'Credentials Login error',
  })
  errors: CredentialsLoginError[];
}
