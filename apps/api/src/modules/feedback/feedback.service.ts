import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FeedbackEntity } from './entities/feedback.entity';
import { FeedbackBuilder } from './builders/feedback.builder';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(FeedbackEntity)
    private feedbacksRepository: Repository<FeedbackEntity>
  ) {}
  async findAll(): Promise<FeedbackEntity[]> {
    return await this.feedbacksRepository.find();
  }
  async findById(id: number): Promise<FeedbackEntity> {
    return await this.feedbacksRepository.findOneBy({
      id,
    });
  }
  async create(
    feedbackData: FeedbackEntity,
    projectId: string
  ): Promise<FeedbackEntity> {
    const feedback = new FeedbackBuilder()
      .setProjectId(projectId)
      .setEmail(feedbackData.email)
      .setMessage(feedbackData.message)
      .setScreenShotUrls(feedbackData.screenshotUrls)
      .setUserAgent(feedbackData.userAgent)
      .setStatus(feedbackData.status)
      .setType(feedbackData.type)
      .setTags(feedbackData.tags)
      .build();
    return await this.feedbacksRepository.save(feedback);
  }
  async update(feedback: FeedbackEntity): Promise<FeedbackEntity> {
    return await this.feedbacksRepository.save(feedback);
  }
}
