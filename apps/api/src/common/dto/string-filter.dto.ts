import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

import { registerEnumType } from '@nestjs/graphql';

export enum QueryMode {
  default = 'default',
  insensitive = 'insensitive',
}

registerEnumType(QueryMode, { name: 'QueryMode', description: undefined });

@InputType()
export class NestedStringFilter {
  @Field(() => String, { nullable: true })
  equals?: string;

  @Field(() => [String], { nullable: true })
  in?: Array<string>;

  @Field(() => [String], { nullable: true })
  notIn?: Array<string>;

  @Field(() => String, { nullable: true })
  lt?: string;

  @Field(() => String, { nullable: true })
  lte?: string;

  @Field(() => String, { nullable: true })
  gt?: string;

  @Field(() => String, { nullable: true })
  gte?: string;

  @Field(() => String, { nullable: true })
  contains?: string;

  @Field(() => String, { nullable: true })
  startsWith?: string;

  @Field(() => String, { nullable: true })
  endsWith?: string;

  @Field(() => String, { nullable: true })
  search?: string;

  @Field(() => NestedStringFilter, { nullable: true })
  not?: NestedStringFilter;
}

@InputType()
export class StringFilter {
  @Field(() => String, { nullable: true })
  equals?: string;

  @Field(() => [String], { nullable: true })
  in?: Array<string>;

  @Field(() => [String], { nullable: true })
  notIn?: Array<string>;

  @Field(() => String, { nullable: true })
  lt?: string;

  @Field(() => String, { nullable: true })
  lte?: string;

  @Field(() => String, { nullable: true })
  gt?: string;

  @Field(() => String, { nullable: true })
  gte?: string;

  @Field(() => String, { nullable: true })
  contains?: string;

  @Field(() => String, { nullable: true })
  startsWith?: string;

  @Field(() => String, { nullable: true })
  endsWith?: string;

  @Field(() => String, { nullable: true })
  search?: string;

  @Field(() => QueryMode, { nullable: true })
  mode?: keyof typeof QueryMode;

  @Field(() => NestedStringFilter, { nullable: true })
  not?: NestedStringFilter;
}
