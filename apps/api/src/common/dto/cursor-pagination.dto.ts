import { Field, InputType, Int } from '@nestjs/graphql';
import { Type } from '@nestjs/common';
import { IsInt } from 'class-validator';

/**
 * Interface defining the structure for cursor-based pagination
 * @template T Type of the data being paginated
 */
export interface ICursorPaginationType {
  take: number; // Number of items to take per page
  cursor: string;
}

export function CreateCursorPagination<T>(
  classRef: Type<T>
): Type<ICursorPaginationType> {
  // Define the main pagination structure as a GraphQL object type
  @InputType(`${classRef.name}Pagination`)
  abstract class Pagination implements ICursorPaginationType {
    @Field(() => Int)
    @IsInt()
    take: number; // Page size, defaults to 10

    @Field(() => String, { nullable: true })
    cursor: ICursorPaginationType['cursor']; // Cursor information for pagination
  }

  return Pagination as Type<ICursorPaginationType>;
}
