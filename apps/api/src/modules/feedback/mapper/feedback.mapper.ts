import { FeedbackEntity } from '../entities/feedback.entity';
import {
  FeedbackModel,
  FeedbackPriority,
  FeedbackStatus,
  FeedbackType,
} from '../models/feedback.model';

export class FeedbackMapper {
  static toModel(entity: FeedbackEntity): FeedbackModel {
    const parsedMetadata = JSON.parse(entity.metadata.toString());
    const parsedUserMetadata = JSON.parse(entity.userMetadata.toString());
    return {
      id: entity.id,
      metadata: Object.keys(parsedMetadata).map((key) => ({
        key,
        value: parsedMetadata[key],
      })),
      userMetadata: Object.keys(parsedUserMetadata).map((key) => ({
        key,
        value: parsedUserMetadata[key],
      })),

      rating: entity.rating,
      type: entity.type as FeedbackType,
      comment: entity.comment,
      priority: entity.priority as FeedbackPriority,
      status: entity.status as FeedbackStatus,
      pageUrl: entity.pageUrl,
      country: entity.country,
      summary: entity.summary,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
