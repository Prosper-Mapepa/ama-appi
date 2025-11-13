import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventRsvp } from './event-rsvp.entity';
import { EventRsvpsService } from './event-rsvps.service';
import { EventRsvpsController } from './event-rsvps.controller';

@Module({
  imports: [TypeOrmModule.forFeature([EventRsvp])],
  controllers: [EventRsvpsController],
  providers: [EventRsvpsService],
  exports: [EventRsvpsService],
})
export class EventRsvpsModule {}

