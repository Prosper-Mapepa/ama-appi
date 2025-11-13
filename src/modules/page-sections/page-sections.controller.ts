import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PageSectionsService } from './page-sections.service';
import { CreatePageSectionDto } from './dto/create-page-section.dto';
import { UpdatePageSectionDto } from './dto/update-page-section.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('page-sections')
export class PageSectionsController {
  constructor(private readonly pageSectionsService: PageSectionsService) {}

  @Get()
  findAll(@Query('page') page: string) {
    if (!page) {
      throw new BadRequestException('Query parameter "page" is required');
    }
    const normalized = page.toLowerCase();
    if (normalized !== 'home' && normalized !== 'about') {
      throw new BadRequestException(`Unsupported page "${page}"`);
    }
    return this.pageSectionsService.findAllByPage(normalized);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreatePageSectionDto) {
    return this.pageSectionsService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePageSectionDto) {
    return this.pageSectionsService.update(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pageSectionsService.remove(id);
  }
}
