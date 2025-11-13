import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';

@Entity({ name: 'users' })
@Index(['email'], { unique: true })
export class User extends BaseEntity {
  @Column({ length: 160 })
  email: string;

  @Column({ name: 'password_hash', length: 255 })
  passwordHash: string;

  @Column({ length: 120, nullable: true })
  name?: string;
}
