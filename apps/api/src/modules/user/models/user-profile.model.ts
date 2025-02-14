import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserProfileModel {
  @Field(() => [String], { description: 'Type of company or organization' })
  companyKind?: string[];

  @Field(() => String, {
    description: 'Role or job title of the profile owner',
  })
  role?: string;

  @Field(() => String, { description: 'Number of people on the team' })
  teamSize?: number;

  @Field(() => String, { description: 'Country where the person is located' })
  country?: string;
}
