import { FeedbackEntity } from '../entities/feedback.entity';
import {
  FeedbackModel,
  FeedbackPriority,
  FeedbackStatus,
  FeedbackType,
} from '../models/feedback.model';

export class FeedbackMapper {
  static toModel(entity: FeedbackEntity): FeedbackModel {
    return {
      id: entity.id,
      metadata: JSON.parse(entity.metadata.toString()),
      userMetadata: JSON.parse(entity.userMetadata.toString()),
      rating: entity.rating,
      type: entity.type as FeedbackType,
      comment: entity.comment,
      priority: entity.priority as FeedbackPriority,
      status: entity.status as FeedbackStatus,
      pageUrl: entity.pageUrl,
      country: entity.country,
      summary: entity.summary,
      createdAt: entity.createdAt.toString(),
      updatedAt: entity.updatedAt.toString(),
    };
  }
}
