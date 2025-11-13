import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';

@Entity({ name: 'gallery_items' })
export class GalleryItem extends BaseEntity {
  @Column({ length: 255 })
  url: string;

  @Column({ length: 160 })
  title: string;

  @Column({ length: 80 })
  category: string;

  @Column({ length: 180, nullable: true })
  caption?: string;

  @Column({ name: 'display_order', type: 'int', default: 0 })
  displayOrder: number;
}
