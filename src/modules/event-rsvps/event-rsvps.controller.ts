import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { EventRsvpsService } from './event-rsvps.service';
import { CreateEventRsvpDto } from './dto/create-event-rsvp.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('events/:eventId/rsvps')
export class EventRsvpsController {
  constructor(private readonly eventRsvpsService: EventRsvpsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Param('eventId') eventId: string) {
    return this.eventRsvpsService.findByEvent(eventId);
  }

  @Post()
  create(@Param('eventId') eventId: string, @Body() dto: CreateEventRsvpDto) {
    return this.eventRsvpsService.create(eventId, dto);
  }
}

