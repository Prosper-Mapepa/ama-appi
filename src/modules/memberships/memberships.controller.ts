import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { MembershipsService } from './memberships.service';
import { CreateMembershipDto } from './dto/create-membership.dto';
import { UpdateMembershipStatusDto } from './dto/update-membership-status.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('memberships')
export class MembershipsController {
  constructor(private readonly membershipsService: MembershipsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.membershipsService.findAll();
  }

  @Post()
  create(@Body() dto: CreateMembershipDto) {
    return this.membershipsService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body() dto: UpdateMembershipStatusDto) {
    return this.membershipsService.updateStatus(id, dto);
  }
}

