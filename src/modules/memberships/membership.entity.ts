import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';

export type MembershipStatus = 'pending' | 'paid' | 'cancelled';
export type MembershipPlan = 'chapter';
export type MembershipPaymentMethod = 'card' | 'paypal' | 'cash';

@Entity({ name: 'memberships' })
@Index(['email', 'planType'])
export class Membership extends BaseEntity {
  @Column({ name: 'first_name', type: 'varchar', length: 80 })
  firstName: string;

  @Column({ name: 'last_name', type: 'varchar', length: 80 })
  lastName: string;

  @Column({ type: 'varchar', length: 160 })
  email: string;

  @Column({ type: 'varchar', length: 32, nullable: true })
  phone?: string;

  @Column({ name: 'plan_type', type: 'varchar', length: 32 })
  planType: MembershipPlan;

  @Column({ name: 'payment_method', type: 'varchar', length: 24, default: 'card' })
  paymentMethod: MembershipPaymentMethod;

  @Column({ type: 'integer' })
  amount: number;

  @Column({ type: 'varchar', length: 24, default: 'pending' })
  status: MembershipStatus;

  @Column({ name: 'checkout_completed_at', type: 'timestamptz', nullable: true })
  checkoutCompletedAt?: Date | null;

  @Column({ name: 'transaction_reference', type: 'varchar', length: 120, nullable: true })
  transactionReference?: string | null;

  @Column({ type: 'text', nullable: true })
  notes?: string | null;
}

