import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { EventRsvp } from '../event-rsvps/event-rsvp.entity';

@Entity({ name: 'events' })
export class Event extends BaseEntity {
  @Column({ length: 160 })
  title: string;

  @Column({ name: 'event_date', type: 'date' })
  date: string;

  @Column({ name: 'event_time', length: 120 })
  time: string;

  @Column({ length: 160 })
  location: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ length: 80 })
  category: string;

  @Column({ type: 'int', default: 0 })
  spots: number;

  @Column({ name: 'image_url', type: 'varchar', length: 255, nullable: true })
  imageUrl?: string | null;

  @OneToMany(() => EventRsvp, (rsvp) => rsvp.event)
  rsvps?: EventRsvp[];
}
