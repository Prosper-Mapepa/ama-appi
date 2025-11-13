import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventRsvp } from './event-rsvp.entity';
import { CreateEventRsvpDto } from './dto/create-event-rsvp.dto';

@Injectable()
export class EventRsvpsService {
  constructor(
    @InjectRepository(EventRsvp)
    private readonly rsvpRepo: Repository<EventRsvp>,
  ) {}

  findByEvent(eventId: string) {
    return this.rsvpRepo.find({
      where: { eventId },
      order: { createdAt: 'DESC' },
    });
  }

  countForEvent(eventId: string) {
    return this.rsvpRepo.count({
      where: { eventId },
    });
  }

  create(eventId: string, dto: CreateEventRsvpDto) {
    const rsvp = this.rsvpRepo.create({
      ...dto,
      eventId,
    });
    return this.rsvpRepo.save(rsvp);
  }
}

