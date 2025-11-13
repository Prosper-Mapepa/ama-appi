import { Column, Entity, Index, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Event } from '../events/event.entity';

@Entity({ name: 'event_rsvps' })
@Index(['eventId', 'email'])
export class EventRsvp extends BaseEntity {
  @Column({ name: 'event_id' })
  eventId: string;

  @ManyToOne(() => Event, (event) => event.rsvps, {
    onDelete: 'CASCADE',
  })
  event: Event;

  @Column({ length: 80 })
  name: string;

  @Column({ length: 160 })
  email: string;

  @Column({ length: 32, nullable: true })
  phone?: string;

  @Column({ name: 'guest_count', type: 'integer', default: 1 })
  guestCount: number;

  @Column({ type: 'text', nullable: true })
  notes?: string | null;
}

