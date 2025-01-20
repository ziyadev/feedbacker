import {
  FeedbackEntity,
  FeedbackStatus,
  FeedbackType,
} from '../entities/feedback.entity';

export class FeedbackBuilder {
  private feedback: FeedbackEntity;

  constructor() {
    this.feedback = new FeedbackEntity();
  }

  setProjectId(projectId: string): FeedbackBuilder {
    this.feedback.projectId = projectId;
    return this;
  }

  setEmail(email: string): FeedbackBuilder {
    this.feedback.email = email;
    return this;
  }
  setMessage(message: string): FeedbackBuilder {
    this.feedback.message = message;
    return this;
  }
  setScreenShotUrls(urls: string[]): FeedbackBuilder {
    this.feedback.screenshotUrls = urls;
    return this;
  }
  addScreenShotUrl(url: string): FeedbackBuilder {
    this.feedback.screenshotUrls.push(url);
    return this;
  }
  setUserAgent(userAgent: string): FeedbackBuilder {
    this.feedback.userAgent = userAgent;
    return this;
  }

  setStatus(status: FeedbackStatus): FeedbackBuilder {
    this.feedback.status = status;
    return this;
  }
  setType(type: FeedbackType): FeedbackBuilder {
    this.feedback.type = type;
    return this;
  }

  setTags(tags: string[]): FeedbackBuilder {
    this.feedback.tags = tags;
    return this;
  }

  addTag(tag: string): FeedbackBuilder {
    this.feedback.tags.push(tag);
    return this;
  }

  build(): FeedbackEntity {
    return this.feedback;
  }
}
