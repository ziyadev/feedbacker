import { EnumTypeFilter, OrderByType } from '@/common/dto/enum-filter.dto';
import { Field, ID, InputType, registerEnumType } from '@nestjs/graphql';
import {
  FeedbackModel,
  FeedbackPriority,
  FeedbackStatus,
  FeedbackType,
} from '../models/feedback.model';
import { StringFilter } from '@/common/dto/string-filter.dto';
import { IntFilter } from '@/common/dto/int-filter.dto';
import { DateTimeFilter } from '@/common/dto/date-time-filter.dto';
import { CreateCursorPagination } from '@/common/dto/cursor-pagination.dto';

@InputType()
class FeedbackTypeFilter extends EnumTypeFilter(FeedbackType) {}
@InputType()
class FeedbackPriorityFilter extends EnumTypeFilter(FeedbackPriority) {}
@InputType()
class FeedbackStatusFilter extends EnumTypeFilter(FeedbackStatus) {}

@InputType()
export class GetAllFeedbacksFilterDto {
  @Field(() => ID, { nullable: true })
  id?: string;

  @Field(() => IntFilter, { nullable: true })
  rating?: IntFilter;

  @Field(() => FeedbackTypeFilter, { nullable: true })
  type?: FeedbackTypeFilter;

  @Field(() => FeedbackPriorityFilter, { nullable: true })
  priority?: FeedbackPriorityFilter;

  @Field(() => FeedbackStatusFilter, { nullable: true })
  status?: FeedbackStatusFilter;

  @Field(() => StringFilter, { nullable: true })
  pageUrl?: StringFilter;

  @Field(() => StringFilter, { nullable: true })
  country?: StringFilter;

  @Field(() => DateTimeFilter, { nullable: true })
  createdAt?: DateTimeFilter;

  @Field(() => DateTimeFilter, { nullable: true })
  updatedAt?: DateTimeFilter;
}
enum GetAllFeedbacksFilterOrderByKeys {
  ID = 'id',
  RATING = 'rating',
  TYPE = 'type',
  PRIORITY = 'priority',
  STATUS = 'status',
  COUNTRY = 'country',
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
}
registerEnumType(GetAllFeedbacksFilterOrderByKeys, {
  name: 'GetAllFeedbacksFilterOrderByKeys',
});

@InputType()
export class GetAllFeedbacksFilterOrderBy {
  @Field(() => GetAllFeedbacksFilterOrderByKeys)
  key: GetAllFeedbacksFilterOrderByKeys;

  @Field(() => OrderByType)
  type: OrderByType;
}

@InputType()
export class FeedbackPaginationDto extends CreateCursorPagination(
  FeedbackModel
) {}
