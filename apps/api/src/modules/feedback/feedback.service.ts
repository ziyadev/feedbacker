import { Injectable, Logger } from '@nestjs/common';
import { FeedbackRepository } from '../database/repositories/feedback.repository';
import { FeedbackModel, PaginatedFeedbackModel } from './models/feedback.model';
import {
  FeedbackPaginationDto,
  GetAllFeedbacksFilterDto,
  GetAllFeedbacksFilterOrderBy,
} from './dto/get-all-feedbacks-filter.dto';
import { FeedbackEntity } from './entities/feedback.entity';
import { CursorService } from '@/common/modules/cursor/cursor.service';
import { FeedbackMapper } from './mapper/feedback.mapper';

@Injectable()
export class FeedbackService {
  private logger = new Logger(FeedbackService.name);
  constructor(
    private readonly feedbackRepository: FeedbackRepository,
    private cursorService: CursorService
  ) {}

  async handleGetAllFeedbacks(
    workspaceId: string,
    filter: GetAllFeedbacksFilterDto,
    { take, cursor }: FeedbackPaginationDto,
    orderBy: GetAllFeedbacksFilterOrderBy
  ): Promise<PaginatedFeedbackModel> {
    const where = {
      workspaceId,
      ...filter,
    };
    const takePlusOne = take + 1;
    const list = await this.feedbackRepository.findMany({
      where,
      take: takePlusOne,
      orderBy: {
        [orderBy.key]: orderBy.type,
      },
      ...this.cursorService.createCursorObject(cursor),
    });
    const totalCount =
      list.length > 0 ? await this.feedbackRepository.count({ where }) : 0;

    return this.cursorService.createPaginationResponse(
      list,
      orderBy.key,
      take,
      totalCount,
      FeedbackMapper.toModel
    );
  }
}
