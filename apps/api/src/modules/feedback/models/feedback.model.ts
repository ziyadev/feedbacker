import { Paginated } from '@/common/models/pagination.model';
import { Field, ID, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { GraphQLDateTime } from 'graphql-scalars';

export enum FeedbackStatus {
  OPEN = 'open',
  CLOSED = 'closed',
  IN_QA = 'in_qa',
  TODO = 'todo',
  BACKLOG = 'backlog',
  RESOLVED = 'resolved',
}
registerEnumType(FeedbackStatus, {
  name: 'FeedbackStatus',
});
export enum FeedbackPriority {
  URGRGENT = 'urgent',
  HIGH = 'high',
  NEUTRAL = 'neutral',
  LOW = 'low',
}
registerEnumType(FeedbackPriority, {
  name: 'FeedbackPriority',
});
export enum FeedbackType {
  BUG = 'bug',
  FEATURE = 'feature',
  QUESTION = 'question',
  GENERAL = 'general',
}
registerEnumType(FeedbackType, {
  name: 'FeedbackType',
});

@ObjectType()
export class KeyValuePair {
  @Field(() => String)
  key: string;

  @Field(() => String)
  value: string;
}

@ObjectType()
export class FeedbackModel {
  @Field(() => ID)
  id: string;

  @Field(() => [KeyValuePair], { nullable: true })
  metadata: KeyValuePair[];

  @Field(() => [KeyValuePair], { nullable: true })
  userMetadata: KeyValuePair[];

  @Field(() => Int, { nullable: true })
  rating: number;

  @Field(() => FeedbackType)
  type: FeedbackType;

  @Field(() => String)
  comment: string;

  @Field(() => FeedbackPriority)
  priority: FeedbackPriority;

  @Field(() => FeedbackStatus)
  status: FeedbackStatus;

  @Field(() => String)
  pageUrl: string;

  @Field(() => String)
  country: string;

  @Field(() => String, { nullable: true })
  summary: string;

  @Field(() => GraphQLDateTime)
  createdAt: Date;

  @Field(() => GraphQLDateTime)
  updatedAt: Date;
}

@ObjectType()
export class PaginatedFeedbackModel extends Paginated(FeedbackModel) {}
