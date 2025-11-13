import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';

@Entity({ name: 'team_members' })
export class TeamMember extends BaseEntity {
  @Column({ length: 120 })
  name: string;

  @Column({ length: 120 })
  role: string;

  @Column({ length: 160, nullable: true })
  major?: string;

  @Column({ type: 'text', nullable: true })
  bio?: string;

  @Column({ length: 160, nullable: true })
  email?: string;

  @Column({ length: 255, nullable: true })
  linkedin?: string;

  @Column({ name: 'image_url', type: 'varchar', length: 255, nullable: true })
  imageUrl?: string | null;

  @Column({ name: 'display_order', type: 'int', default: 0 })
  displayOrder: number;
}
