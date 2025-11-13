import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';

@Entity({ name: 'settings' })
@Index(['key'], { unique: true })
export class Setting extends BaseEntity {
  @Column({ length: 80 })
  key: string;

  @Column({ type: 'jsonb', nullable: true })
  value: Record<string, unknown> | null;
}
