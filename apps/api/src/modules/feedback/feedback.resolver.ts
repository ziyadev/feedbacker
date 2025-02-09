import { Args, Resolver, Query } from '@nestjs/graphql';
import { FeedbackModel, PaginatedFeedbackModel } from './models/feedback.model';
import { FeedbackService } from './feedback.service';
import { Workspace } from '@/common/decorators/workspace.decorator';
import { WorkspaceSessionData } from '@/common/config/sessoin.config';
import {
  FeedbackPaginationDto,
  GetAllFeedbacksFilterDto,
  GetAllFeedbacksFilterOrderBy,
} from './dto/get-all-feedbacks-filter.dto';
import { WorkspaceAuth } from '../auth/decorator/workspace.decorator';
import { Auth } from '../auth/decorator/auth.decorator';

@Auth()
@WorkspaceAuth()
@Resolver(() => FeedbackModel)
export class FeedbackResolver {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Query(() => PaginatedFeedbackModel)
  getFeedbacks(
    @Workspace() workspace: WorkspaceSessionData,
    @Args('filter', { nullable: true }) filter: GetAllFeedbacksFilterDto,
    @Args('pagination', { nullable: true }) pagination: FeedbackPaginationDto,
    @Args('orderBy', { nullable: true }) orderBy: GetAllFeedbacksFilterOrderBy
  ) {
    return this.feedbackService.handleGetAllFeedbacks(
      workspace.id,
      filter,
      pagination,
      orderBy
    );
  }
}
