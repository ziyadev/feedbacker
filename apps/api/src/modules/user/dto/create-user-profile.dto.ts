import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateUserProfileDto {
  @Field(() => [String])
  @IsNotEmpty()
  companyKind: string[];

  @Field(() => String)
  @IsNotEmpty()
  role: string;

  @Field(() => String)
  @IsNotEmpty()
  teamSize: string;

  @Field(() => String)
  @IsNotEmpty()
  country: string;
}
