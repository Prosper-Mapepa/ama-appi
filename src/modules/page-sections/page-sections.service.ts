import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PageSection } from './page-section.entity';
import { CreatePageSectionDto } from './dto/create-page-section.dto';
import { UpdatePageSectionDto } from './dto/update-page-section.dto';

@Injectable()
export class PageSectionsService {
  constructor(
    @InjectRepository(PageSection)
    private readonly sectionsRepo: Repository<PageSection>,
  ) {}

  findAllByPage(page: PageSection['page']) {
    if (!['home', 'about'].includes(page)) {
      throw new BadRequestException(`Unsupported page ${page}`);
    }
    return this.sectionsRepo.find({
      where: { page },
      order: { displayOrder: 'ASC', createdAt: 'ASC' },
    });
  }

  async findOne(id: string) {
    const section = await this.sectionsRepo.findOne({ where: { id } });
    if (!section) {
      throw new NotFoundException(`Section ${id} not found`);
    }
    return section;
  }

  create(dto: CreatePageSectionDto) {
    const section = this.sectionsRepo.create({
      ...dto,
      displayOrder: dto.displayOrder ?? 0,
    });
    return this.sectionsRepo.save(section);
  }

  async update(id: string, dto: UpdatePageSectionDto) {
    const section = await this.findOne(id);
    Object.assign(section, dto);
    return this.sectionsRepo.save(section);
  }

  async remove(id: string) {
    const section = await this.findOne(id);
    await this.sectionsRepo.remove(section);
    return { deleted: true };
  }
}
