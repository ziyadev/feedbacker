import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';

export enum FeedbackType {
  BUG = 'bug',
  FEATURE = 'feature',
  IMPROVEMENT = 'improvement',
  OTHER = 'other',
}

export enum FeedbackStatus {
  NEW = 'new',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  REJECTED = 'rejected',
}

@Entity('feedbacks')
export class FeedbackEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  email: string;

  @Column({
    type: 'enum',
    enum: FeedbackType,
    default: FeedbackType.OTHER,
  })
  type: FeedbackType;

  @Column('varchar')
  message: string;

  @Column({ nullable: true })
  screenshotUrls: string[];

  @Column('varchar')
  userAgent: string;

  @Column('varchar')
  url: string;

  @Column({
    type: 'enum',
    enum: FeedbackStatus,
    default: FeedbackStatus.NEW,
  })
  status: FeedbackStatus;

  @Column()
  tags: string[];

  @Column('uuid')
  projectId: string;
}
