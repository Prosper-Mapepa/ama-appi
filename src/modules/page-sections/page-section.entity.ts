import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';

export type PageSectionName = 'home' | 'about';

@Entity({ name: 'page_sections' })
@Index(['page', 'displayOrder'])
export class PageSection extends BaseEntity {
  @Column({ type: 'varchar', length: 64 })
  page: PageSectionName;

  @Column({ type: 'varchar', length: 120 })
  title: string;

  @Column({ type: 'varchar', length: 180 })
  heading: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ name: 'image_url', type: 'varchar', length: 255, nullable: true })
  imageUrl?: string | null;

  @Column({ name: 'display_order', default: 0 })
  displayOrder: number;
}
