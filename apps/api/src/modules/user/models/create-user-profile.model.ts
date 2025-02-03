import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { UserProfileModel } from '../models/user-profile.model';
export enum CreateUserProfileErrorCode {
  ALREADY_EXISTS = 'ALREADY_EXISTS',
}
registerEnumType(CreateUserProfileErrorCode, {
  name: 'CreateUserProfileErrorCode',
});

@ObjectType()
export class CreateUserProfileError {
  @Field(() => CreateUserProfileErrorCode)
  code: CreateUserProfileErrorCode;

  @Field(() => String)
  message: string;
}

@ObjectType()
export class CreateUserProfileModel {
  @Field(() => UserProfileModel, { nullable: true, description: 'Profile' })
  profile: UserProfileModel;
  @Field(() => [CreateUserProfileError], {
    nullable: true,
    description: 'Create user profile errors',
  })
  errors: CreateUserProfileError[];
}
