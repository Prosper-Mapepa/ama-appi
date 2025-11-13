import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GalleryItem } from './gallery-item.entity';
import { CreateGalleryItemDto } from './dto/create-gallery-item.dto';
import { UpdateGalleryItemDto } from './dto/update-gallery-item.dto';

@Injectable()
export class GalleryService {
  constructor(
    @InjectRepository(GalleryItem)
    private readonly galleryRepo: Repository<GalleryItem>,
  ) {}

  findAll() {
    return this.galleryRepo.find({
      order: { displayOrder: 'ASC', createdAt: 'ASC' },
    });
  }

  async findOne(id: string) {
    const item = await this.galleryRepo.findOne({ where: { id } });
    if (!item) {
      throw new NotFoundException(`Gallery item ${id} not found`);
    }
    return item;
  }

  create(dto: CreateGalleryItemDto) {
    const item = this.galleryRepo.create({
      ...dto,
      displayOrder: dto.displayOrder ?? 0,
    });
    return this.galleryRepo.save(item);
  }

  async update(id: string, dto: UpdateGalleryItemDto) {
    const item = await this.findOne(id);
    Object.assign(item, dto);
    return this.galleryRepo.save(item);
  }

  async remove(id: string) {
    const item = await this.findOne(id);
    await this.galleryRepo.remove(item);
    return { deleted: true };
  }
}
