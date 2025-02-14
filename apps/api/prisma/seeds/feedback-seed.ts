import {
  rand,
  randBrowser,
  randCountry,
  randEmail,
  randNumber,
  randProductDescription,
  randResolution,
  randText,
  randUrl,
  randUuid,
} from '@ngneat/falso';
import { PrismaClient } from '@prisma/client';
export enum FeedbackStatus {
  OPEN = 'open',
  CLOSED = 'closed',
  IN_QA = 'in_qa',
  TODO = 'todo',
  BACKLOG = 'backlog',
  RESOLVED = 'resolved',
}
export enum FeedbackPriority {
  URGRGENT = 'urgent',
  HIGH = 'high',
  NEUTRAL = 'neutral',
  LOW = 'low',
}
export enum FeedbackType {
  BUG = 'bug',
  FEATURE = 'feature',
  QUESTION = 'question',
  GENERAL = 'general',
}
export default async function feedbackSeed(prisma: PrismaClient) {
  const workspaces = await prisma.workspace.findMany();
  workspaces.forEach(async (workspace) => {
    await prisma.feedbackCategory.create({
      data: {
        description: randProductDescription(),
        name: rand(['improvement', 'task', 'seggestion']),
      },
    });
    Array.from({ length: 100 }).forEach(async () => {
      await prisma.feedback.create({
        data: {
          workspace: {
            connect: {
              id: workspace.id,
            },
          },
          comment: randText(),
          summary: rand([randText(), undefined]),
          type: rand([
            FeedbackType.BUG,
            FeedbackType.FEATURE,
            FeedbackType.QUESTION,
            FeedbackType.GENERAL,
          ]),
          priority: rand([
            FeedbackPriority.HIGH,
            FeedbackPriority.URGRGENT,
            FeedbackPriority.NEUTRAL,
            FeedbackPriority.LOW,
          ]),
          status: rand([
            FeedbackStatus.BACKLOG,
            FeedbackStatus.IN_QA,
            FeedbackStatus.TODO,
            FeedbackStatus.RESOLVED,
            FeedbackStatus.OPEN,
            FeedbackStatus.CLOSED,
          ]),
          country: randCountry(),
          pageUrl: randUrl(),
          rating: rand([randNumber({ min: 1, max: 5 }), undefined]),
          userMetadata: JSON.stringify({
            device: rand(['desktop', 'mobile', 'tablet', 'other', 'unknown']),
            browser: randBrowser(),
            browserVersion: randNumber({ min: 1, max: 10 }),
            browserResolution: `${randResolution().height}X${
              randResolution().width
            }`,
            os: rand(['windows', 'mac', 'linux', 'android', 'ios', 'other']),
            osVersion: randNumber({ min: 1, max: 10 }),
          }),
          metadata: JSON.stringify({
            userId: randUuid(),
            email: randEmail(),
          }),
        },
      });
    });
  });
}
