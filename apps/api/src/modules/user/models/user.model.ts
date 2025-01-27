import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class UserModel {
  @Field(() => ID, { description: 'Unique identifier for the user' })
  id: string;

  @Field({ description: 'Full name of the user' })
  name: string;

  @Field({ description: 'Email address of the user' })
  email: string;

  @Field({ description: 'Whether the user has verified their email address' })
  emailVerified: boolean;

  @Field({ description: 'Timestamp of when the user account was created' })
  createdAt: Date;

  @Field({ description: 'Timestamp of when the user account was last updated' })
  updatedAt: Date;

  @Field({
    description: "URL of the user's profile avatar image",
    nullable: true,
  })
  avatar: string;
}
