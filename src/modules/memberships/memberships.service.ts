import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Membership } from './membership.entity';
import { CreateMembershipDto } from './dto/create-membership.dto';
import { UpdateMembershipStatusDto } from './dto/update-membership-status.dto';

@Injectable()
export class MembershipsService {
  constructor(
    @InjectRepository(Membership)
    private readonly membershipRepo: Repository<Membership>,
  ) {}

  findAll() {
    return this.membershipRepo.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const membership = await this.membershipRepo.findOne({ where: { id } });
    if (!membership) {
      throw new NotFoundException(`Membership ${id} not found`);
    }
    return membership;
  }

  create(dto: CreateMembershipDto) {
    const membership = this.membershipRepo.create({
      ...dto,
      status: 'pending',
    });
    return this.membershipRepo.save(membership);
  }

  async updateStatus(id: string, dto: UpdateMembershipStatusDto) {
    const membership = await this.findOne(id);
    membership.status = dto.status;
    membership.transactionReference = dto.transactionReference ?? membership.transactionReference;
    if (dto.status === 'paid' && !membership.checkoutCompletedAt) {
      membership.checkoutCompletedAt = new Date();
    }
    if (dto.status !== 'paid') {
      membership.checkoutCompletedAt = null;
    }
    return this.membershipRepo.save(membership);
  }
}

