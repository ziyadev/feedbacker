import { Module } from '@nestjs/common';
import { FeedbackResolver } from './feedback.resolver';
import { FeedbackService } from './feedback.service';
import { CursorService } from '@/common/modules/cursor/cursor.service';

@Module({
  providers: [FeedbackService, FeedbackResolver, CursorService],
  exports: [FeedbackService],
})
export class FeedbackModule {}
