import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Setting } from './setting.entity';
import { UpsertSettingDto } from './dto/upsert-setting.dto';

@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(Setting)
    private readonly settingsRepo: Repository<Setting>,
  ) {}

  findAll() {
    return this.settingsRepo.find({ order: { key: 'ASC' } });
  }

  async findOne(key: string) {
    const setting = await this.settingsRepo.findOne({ where: { key } });
    if (!setting) {
      throw new NotFoundException(`Setting ${key} not found`);
    }
    return setting;
  }

  async upsert(dto: UpsertSettingDto) {
    let setting = await this.settingsRepo.findOne({
      where: { key: dto.key },
    });
    if (!setting) {
      setting = this.settingsRepo.create(dto);
    } else {
      setting.value = dto.value;
    }
    return this.settingsRepo.save(setting);
  }

  async remove(key: string) {
    const setting = await this.findOne(key);
    await this.settingsRepo.remove(setting);
    return { deleted: true };
  }
}
