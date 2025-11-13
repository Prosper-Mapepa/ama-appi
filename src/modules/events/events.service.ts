import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './event.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventsRepo: Repository<Event>,
  ) {}

  findAll() {
    return this.eventsRepo
      .createQueryBuilder('event')
      .loadRelationCountAndMap('event.rsvpCount', 'event.rsvps')
      .orderBy('event.event_date', 'ASC')
      .addOrderBy('event.created_at', 'ASC')
      .getMany();
  }

  async findOne(id: string) {
    const event = await this.eventsRepo
      .createQueryBuilder('event')
      .loadRelationCountAndMap('event.rsvpCount', 'event.rsvps')
      .where('event.id = :id', { id })
      .getOne();
    if (!event) {
      throw new NotFoundException(`Event ${id} not found`);
    }
    return event;
  }

  create(dto: CreateEventDto) {
    const event = this.eventsRepo.create({
      ...dto,
      spots: dto.spots ?? 0,
    });
    return this.eventsRepo.save(event);
  }

  async update(id: string, dto: UpdateEventDto) {
    const event = await this.findOne(id);
    Object.assign(event, dto);
    return this.eventsRepo.save(event);
  }

  async remove(id: string) {
    const event = await this.findOne(id);
    await this.eventsRepo.remove(event);
    return { deleted: true };
  }
}
