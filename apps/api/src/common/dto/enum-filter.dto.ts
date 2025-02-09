import { Field, registerEnumType } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Type } from '@nestjs/common';

export enum OrderByType {
  DESC = 'desc',
  ASC = 'asc',
}
registerEnumType(OrderByType, {
  name: 'OrderByType',
});

export interface IEnumFilterType<TEnum> {
  equals?: keyof TEnum;
  in?: Array<keyof TEnum>;
  notIn?: Array<keyof TEnum>;
}

export function EnumTypeFilter<TEnum>(
  enumType: any
): Type<IEnumFilterType<TEnum>> {
  @InputType()
  class EnumFilter {
    @Field(() => enumType, { nullable: true })
    equals?: keyof TEnum;

    @Field(() => [enumType], { nullable: true })
    in?: Array<keyof TEnum>;

    @Field(() => [enumType], { nullable: true })
    notIn?: Array<keyof TEnum>;
  }
  return EnumFilter as Type<IEnumFilterType<TEnum>>;
}

// example usage
