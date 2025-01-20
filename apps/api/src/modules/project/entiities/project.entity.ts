import { BaseEntity } from '../../../common/entities/base.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { FeedbackEntity } from '../../feedback/entities/feedback.entity';

@Entity()
export class ProjectEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  projectOriginUrl: string;

  @Column('varchar')
  name: string;

  @Column('varchar', { unique: true })
  slug: string;

  @Column('varchar', { nullable: true })
  logo: string;

  @Column('varchar', { default: 'free' })
  plan: string;

  @Column('varchar', { nullable: true, unique: true })
  stripeId: string;

  @Column('varchar', { nullable: true, unique: true })
  stripeConnectId: string;

  @Column('int')
  billingCycleStart: number;

  @Column('timestamp', { nullable: true })
  paymentFailedAt: Date;

  @Column('varchar', { nullable: true })
  payoutMethodId: string;

  @Column('varchar', { nullable: true, unique: true })
  referralLinkId: string;

  @Column('int', { default: 0 })
  referredSignups: number;

  @Column('boolean', { default: false })
  webhookEnabled: boolean;

  // Relations

  @OneToOne(() => FeedbackEntity, (table) => table.projectId)
  feedback: FeedbackEntity;
}
