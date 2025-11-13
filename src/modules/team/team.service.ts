import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TeamMember } from './team-member.entity';
import { CreateTeamMemberDto } from './dto/create-team-member.dto';
import { UpdateTeamMemberDto } from './dto/update-team-member.dto';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(TeamMember)
    private readonly teamRepo: Repository<TeamMember>,
  ) {}

  findAll() {
    return this.teamRepo.find({
      order: { displayOrder: 'ASC', createdAt: 'ASC' },
    });
  }

  async findOne(id: string) {
    const member = await this.teamRepo.findOne({ where: { id } });
    if (!member) {
      throw new NotFoundException(`Team member ${id} not found`);
    }
    return member;
  }

  create(dto: CreateTeamMemberDto) {
    const member = this.teamRepo.create({
      ...dto,
      displayOrder: dto.displayOrder ?? 0,
    });
    return this.teamRepo.save(member);
  }

  async update(id: string, dto: UpdateTeamMemberDto) {
    const member = await this.findOne(id);
    Object.assign(member, dto);
    return this.teamRepo.save(member);
  }

  async remove(id: string) {
    const member = await this.findOne(id);
    await this.teamRepo.remove(member);
    return { deleted: true };
  }
}
