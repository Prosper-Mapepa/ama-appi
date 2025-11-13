import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hash } from 'bcryptjs';
import { User } from './user.entity';

export interface CreateAdminOptions {
  email: string;
  password: string;
  name?: string;
}

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
  ) {}

  findByEmail(email: string) {
    return this.usersRepo.findOne({ where: { email } });
  }

  async createAdmin(options: CreateAdminOptions) {
    const existing = await this.findByEmail(options.email);
    if (existing) {
      throw new ConflictException(
        `User with email ${options.email} already exists`,
      );
    }

    const passwordHash = await hash(options.password, 12);

    const user = this.usersRepo.create({
      email: options.email,
      passwordHash,
      name: options.name,
    });

    return this.usersRepo.save(user);
  }
}
